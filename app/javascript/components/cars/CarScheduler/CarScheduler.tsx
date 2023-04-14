import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import i18n from "../../../util/i18n";
import { default as addToDate } from "date-fns/add";
import {
  DateSelectArg,
  EventChangeArg,
  EventClickArg,
} from "@fullcalendar/core";
import { endOfDay, format, parseISO, startOfDay } from "date-fns";
import axios from "axios";
import { useCsrf } from "../../../util/useCsrf";
import { useMitt } from "../../../util/useMitt";
import { FlashMitEvent } from "../../common/flashes/flashMessages";
import EventFormModal from "./EventFormModal";

type CarSchedulerProps = {
  carEvents: Array<
    Omit<ScheduleEvent, "start" | "end"> & { start: string; end: string }
  >;
  postPath: string;
  carName: string;
};

export type ScheduleEvent = {
  start: Date;
  end: Date;
  allDay: boolean;
  id?: string;
  title: string;
};

const CarScheduler = ({ carEvents, postPath, carName }: CarSchedulerProps) => {
  const mitt = useMitt<{ flash: FlashMitEvent }>();

  const { token: csrfToken } = useCsrf();
  const [events, setEvents] = useState<Array<ScheduleEvent>>(() => {
    return carEvents.map((event) => ({
      ...event,
      start: parseISO(event.start),
      end: parseISO(event.end),
    }));
  });
  const [currentEvent, setCurrentEvent] = useState<ScheduleEvent>({
    start: new Date(),
    end: new Date(),
    title: "",
    allDay: false,
  });

  const appendNewEventToState = (event: ScheduleEvent, id: string) => {
    setEvents((previousEvents) => {
      const newEvents = structuredClone(previousEvents);
      newEvents.push({
        ...event,
        id: id,
      });
      return newEvents;
    });
  };

  const updateEventInState = (data: {
    start_date: string;
    end_date: string;
    comment: string;
    id: string;
  }) => {
    setEvents((previous) => {
      const newEvents = structuredClone(previous);
      const eventToUpdate = newEvents.find(
        (el) => el.id.toString() === data.id.toString()
      );
      eventToUpdate.start = parseISO(data.start_date);
      eventToUpdate.end = parseISO(data.end_date);
      eventToUpdate.title = data.comment;
      return newEvents;
    });
  };

  const removeEventFromState = (id: string) => {
    setEvents((previous) => {
      const newEvents = structuredClone(previous);
      const idx = newEvents.findIndex(
        (event) => id.toString() === event.id.toString()
      );
      newEvents.splice(idx, 1);
      return newEvents;
    });
  };

  const [modalState, setModalState] = useState<"closed" | "new" | "edit">(
    "closed"
  );
  const closeModal = () => setModalState("closed");

  const submitEvent = async (value: ScheduleEvent) => {
    switch (modalState) {
      case "edit":
        return await updateEvent(value, value);
      case "new":
        return await createNewEvent(value);
      default:
        return;
    }
  };

  const eventResizeHandler = async (e: EventChangeArg) => {
    const eventToUpdate = events.find(
      (el) => el.id.toString() === e.event.id.toString()
    );
    const end = e.event.end ?? addToDate(e.event.start, { minutes: 30 });
    await updateEvent(eventToUpdate, { start: e.event.start, end });
  };

  const eventClickHandler = (e: EventClickArg) => {
    const eventToUpdate = events.find(
      (el) => el.id.toString() === e.event.id.toString()
    );
    setCurrentEvent(eventToUpdate);
    setModalState("edit");
  };

  const dateSelectHandler = (e: DateSelectArg) => {
    setCurrentEvent({ start: e.start, end: e.end, allDay: false, title: "" });
    setModalState("new");
  };

  const dateClickHandler = (e: DateClickArg) => {
    const startDate = e.allDay ? startOfDay(e.date) : e.date;
    const endDate = e.allDay
      ? endOfDay(e.date)
      : addToDate(e.date, { minutes: 30 });
    setCurrentEvent({
      start: startDate,
      end: endDate,
      allDay: e.allDay,
      title: "",
    });
    setModalState("new");
  };

  const destroyEvent = async (value: ScheduleEvent) => {
    try {
      await axios.delete(`/admin/dashboard/schedules/${value.id}`, {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      });

      removeEventFromState(value.id);
    } catch (err) {
      mitt.emit("flash", { type: "error", msg: err.response.data.error });
    }
    closeModal();
  };

  const updateEvent = async (
    eventToUpdate: ScheduleEvent,
    changes: Partial<ScheduleEvent>
  ) => {
    try {
      const { data } = await axios.put(
        `/admin/dashboard/schedules/${eventToUpdate.id}`,
        {
          comment: changes.title,
          start_date: changes.start,
          end_date: changes.end,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      updateEventInState(data);
    } catch (err) {
      mitt.emit("flash", { type: "error", msg: err.response.data.error });
    }

    closeModal();
  };

  const createNewEvent = async (value: ScheduleEvent) => {
    try {
      const { data } = await axios.post(
        postPath,
        {
          start_date: value.start,
          end_date: value.end,
          comment: value.title,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      appendNewEventToState(value, data.id);
    } catch (err) {
      mitt.emit("flash", { type: "error", msg: err.response.data.error });
    }
    closeModal();
  };

  return (
    <>
      <EventFormModal
        carName={carName}
        modalState={modalState}
        closeModal={closeModal}
        currentEvent={currentEvent}
        submitEvent={submitEvent}
        destroyEvent={() => destroyEvent(currentEvent)}
      />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        locale={i18n.locale === "rs" ? "sr" : i18n.locale}
        selectOverlap={false}
        initialView="timeGridWeek"
        firstDay={1}
        buttonText={{
          today: i18n.t("full_calendar.button_text.today"),
          week: i18n.t("full_calendar.button_text.week"),
          month: i18n.t("full_calendar.button_text.month"),
        }}
        headerToolbar={{ end: "timeGridWeek,dayGridMonth today prev,next" }}
        selectable={true}
        select={dateSelectHandler}
        dateClick={dateClickHandler}
        eventDurationEditable={true}
        eventStartEditable={true}
        eventDrop={eventResizeHandler}
        eventOverlap={false}
        eventResize={eventResizeHandler}
        allDayMaintainDuration={true}
        events={events}
        eventClick={eventClickHandler}
        eventContent={(arg) => (
          <div className="flex flex-col">
            <span>{format(arg.event.start, "HH:mm")}</span>
            <span className="truncate text-sm">{arg.event.title}</span>
          </div>
        )}
      />
    </>
  );
};
export default CarScheduler;
