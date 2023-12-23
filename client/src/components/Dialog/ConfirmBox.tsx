"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import SubmitButton from "../Button/SubmitButton";

type ConfirmBoxType = {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  title: string;
  children: React.ReactElement;
  buttonLabel: string;
};

export default function ConfirmBox({
  isOpen,
  onClose,
  onAction,
  children,
  title,
  buttonLabel,
}: ConfirmBoxType) {
  return (
    <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
              <form action={onAction}>
                <SubmitButton label={buttonLabel} />
              </form>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
