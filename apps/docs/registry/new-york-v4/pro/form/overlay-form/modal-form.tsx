'use client'

import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import { cn } from '@/lib/utils'
import {
  overlayFormHeaderClassName,
  overlayFormModalBodyClassName,
  overlayFormModalContentClassName,
  overlayFormModalFooterClassName,
} from './classes'
import { OverlayFormContent } from './content'
import {
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalRoot,
  ModalTitle,
  ModalTrigger,
} from './modal-elements'
import { getSubmitterCancelHandler, OverlayFooter, OverlaySubmitter } from './submitter'
import type { ModalFormProps } from './types'
import { useOverlayForm } from './use-overlay-form'

export function ModalForm({
  trigger,
  title,
  description,
  children,
  schema,
  schemaComponents,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onFinish,
  onFinishFailed,
  onCancel,
  submitter,
  form,
  formProps,
  columns,
  gap,
  className,
  widthClass = 'sm:max-w-lg',
}: ModalFormProps) {
  const { activeForm, open, setOpen, loading, handleSubmit, handleCancel } = useOverlayForm({
    form,
    formProps,
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
    onFinish,
    onFinishFailed,
    onCancel: getSubmitterCancelHandler(submitter) ?? onCancel,
  })

  return (
    <ModalRoot open={open} onOpenChange={setOpen}>
      {isRenderableNode(trigger) && <ModalTrigger asChild>{trigger}</ModalTrigger>}
      <ModalContent className={cn(widthClass, overlayFormModalContentClassName)}>
        <ModalHeader className={overlayFormHeaderClassName}>
          <ModalTitle>{title}</ModalTitle>
          {isRenderableNode(description) && <ModalDescription>{description}</ModalDescription>}
        </ModalHeader>
        <OverlayFormContent
          form={activeForm}
          schema={schema}
          schemaComponents={schemaComponents}
          columns={columns}
          gap={gap}
          className={className}
          bodyClassName={overlayFormModalBodyClassName}
          footer={
            <OverlayFooter
              hidden={submitter === false}
              actions={
                <OverlaySubmitter loading={loading} submitter={submitter} onCancel={handleCancel} />
              }
              Footer={ModalFooter}
              className={overlayFormModalFooterClassName}
            />
          }
          onSubmit={handleSubmit}
        >
          {children}
        </OverlayFormContent>
      </ModalContent>
    </ModalRoot>
  )
}
