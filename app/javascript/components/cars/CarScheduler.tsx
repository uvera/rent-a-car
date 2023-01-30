import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Button, Modal } from "flowbite-react";
import i18n from "../../util/i18n";
import { default as addToDate } from "date-fns/add";
import {
  DateSelectArg,
  EventChangeArg,
  EventClickArg,
} from "@fullcalendar/core";
import { endOfDay, format, parseISO, startOfDay } from "date-fns";
import axios from "axios";
import { useCsrf } from "../../util/useCsrf";
import UseMitt, { useMitt } from "../../util/useMitt";
import { FlashMitEvent } from "../common/flashes/flashMessages";

type CarSchedulerProps = {
  carEvents: Array<
    Omit<ScheduleEvent, "start" | "end"> & { start: string; end: string }
  >;
  postPath: string;
  carName: string;
};

type ScheduleEvent = {
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
  const [currentEvent, setCurrentEvent] = useState<ScheduleEvent>(null);

  const [modalState, setModalState] = useState<"closed" | "new" | "edit">(
    "closed"
  );
  const closeModal = () => setModalState("closed");

  const modalSaveAction = () => {
    if (modalState === "new") {
      submitNewEvent();
    } else if (modalState === "edit") {
      updateEvent(currentEvent, currentEvent);
    }
  };

  const updateTitle = (title: string) => {
    setCurrentEvent((previous) => {
      const newEvent = structuredClone(previous);
      newEvent.title = title;
      return newEvent;
    });
  };

  const eventResizeHandler = (e: EventChangeArg) => {
    const eventToUpdate = events.find(
      (el) => el.id.toString() === e.event.id.toString()
    );
    const end = e.event.end ?? addToDate(e.event.start, { minutes: 30 });
    updateEvent(eventToUpdate, { start: e.event.start, end });
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

  const destroyCurrentEvent = async () => {
    try {
      await axios.delete(`/admin/dashboard/schedules/${currentEvent.id}`, {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      });
      setEvents((previous) => {
        const newEvents = structuredClone(previous);
        const idx = newEvents.findIndex(
          (event) => currentEvent.id.toString() === event.id.toString()
        );
        newEvents.splice(idx, 1);
        return newEvents;
      });
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
    } catch (err) {
      mitt.emit("flash", { type: "error", msg: err.response.data.error });
    }

    closeModal();
  };

  const submitNewEvent = async () => {
    try {
      const { data } = await axios.post(
        postPath,
        {
          start_date: currentEvent.start,
          end_date: currentEvent.end,
          comment: currentEvent.title,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      setEvents((previousEvents) => {
        const newEvents = structuredClone(previousEvents);
        newEvents.push({
          ...currentEvent,
          id: data.id,
        });
        return newEvents;
      });
    } catch (err) {
      mitt.emit("flash", { type: "error", msg: err.response.data.error });
    }
    closeModal();
  };

  return (
    <>
      <Modal
        size={"lg"}
        dismissible={true}
        show={modalState !== "closed"}
        onClose={closeModal}
        className={"!z-100"}
      >
        <Modal.Body>
          {currentEvent ? (
            <>
              <div className="flex flex-col">
                <div>
                  <span>{i18n.t("cars.schedules.start_date")}: </span>
                  <span>{format(currentEvent.start, "dd.M.yyyy HH:mm")}</span>
                </div>
                <div>
                  <span>{i18n.t("cars.schedules.end_date")}: </span>
                  <span>{format(currentEvent.end, "dd.M.yyyy HH:mm")}</span>
                </div>
                <div>
                  <span>{i18n.t("cars.schedules.car_name")}: </span>
                  <span>{carName}</span>
                </div>
                <div>
                  <span>{i18n.t("cars.schedules.comment")}: </span>
                  <input
                    type="text"
                    value={currentEvent?.title}
                    onChange={(e) => updateTitle(e.target.value)}
                    className={`resize-none inline-block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
                               focus:ring-accent focus:border-accent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-white dark:focus:ring-accent dark:focus:border-accent
                  `}
                  />
                </div>
              </div>
            </>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row gap-2">
            <Button
              type="button"
              onClick={modalSaveAction}
              className="!bg-accent"
            >
              {i18n.t("forms.buttons.save")}
            </Button>
            <Button type="button" onClick={() => closeModal()} color="gray">
              {i18n.t("forms.buttons.cancel")}
            </Button>
            {modalState === "edit" ? (
              <Button
                type="button"
                onClick={() => destroyCurrentEvent()}
                color="red"
                className="!bg-red-700 text-gray-300"
              >
                {i18n.t("forms.buttons.delete")}
              </Button>
            ) : null}
          </div>
        </Modal.Footer>
      </Modal>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        selectOverlap={false}
        initialView="timeGridWeek"
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
