import { Button, Modal } from "flowbite-react";
import { format } from "date-fns";
import React, { useEffect } from "react";
import i18n from "../../../util/i18n";
import { useForm } from "react-hook-form";
import { ScheduleEvent } from "./CarScheduler";

type Props = {
  currentEvent: ScheduleEvent;
  carName: string;
  modalState: "closed" | "new" | "edit";
  closeModal: () => void;
  submitEvent: (value: ScheduleEvent) => void;
  destroyEvent: () => void;
};

const EventFormModal = ({
  carName,
  modalState,
  closeModal,
  currentEvent,
  submitEvent,
  destroyEvent,
}: Props) => {
  const form = useForm({
    values: currentEvent,
  });
  const { reset, register, handleSubmit } = form;

  useEffect(() => reset(currentEvent), [currentEvent]);

  const submitForm = handleSubmit((values) => submitEvent(values));

  return (
    <Modal
      size={"lg"}
      dismissible={true}
      show={modalState !== "closed"}
      onClose={closeModal}
      className="!z-100"
    >
      <Modal.Body>
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
              {...register("title")}
              className={`resize-none inline-block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
                               focus:ring-accent focus:border-accent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-white dark:focus:ring-accent dark:focus:border-accent
                  `}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex flex-row gap-2">
          <Button type="button" onClick={submitForm} className="!bg-accent">
            {i18n.t("forms.buttons.save")}
          </Button>
          <Button type="button" onClick={closeModal} color="gray">
            {i18n.t("forms.buttons.cancel")}
          </Button>
          {modalState === "edit" ? (
            <Button
              type="button"
              onClick={destroyEvent}
              color="red"
              className="!bg-red-700 !text-gray-300"
            >
              {i18n.t("forms.buttons.delete")}
            </Button>
          ) : null}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EventFormModal;
