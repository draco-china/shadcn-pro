'use client'

import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import {
  overlayFormDrawerBodyClassName,
  overlayFormDrawerContentClassName,
  overlayFormDrawerFooterClassName,
  overlayFormHeaderClassName,
} from './classes'
import { OverlayFormContent } from './content'
import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from './drawer-elements'
import { getSubmitterCancelHandler, OverlayFooter, OverlaySubmitter } from './submitter'
import type { DrawerFormProps } from './types'
import { useOverlayForm } from './use-overlay-form'

export function DrawerForm({
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
  side = 'right',
}: DrawerFormProps) {
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
    <DrawerRoot open={open} onOpenChange={setOpen} direction={side}>
      {isRenderableNode(trigger) && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent className={overlayFormDrawerContentClassName}>
        <DrawerHeader className={overlayFormHeaderClassName}>
          <DrawerTitle>{title}</DrawerTitle>
          {isRenderableNode(description) && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <OverlayFormContent
          form={activeForm}
          schema={schema}
          schemaComponents={schemaComponents}
          columns={columns}
          gap={gap}
          className={className}
          bodyClassName={overlayFormDrawerBodyClassName}
          footer={
            <OverlayFooter
              hidden={submitter === false}
              actions={
                <OverlaySubmitter loading={loading} submitter={submitter} onCancel={handleCancel} />
              }
              Footer={DrawerFooter}
              className={overlayFormDrawerFooterClassName}
            />
          }
          onSubmit={handleSubmit}
        >
          {children}
        </OverlayFormContent>
      </DrawerContent>
    </DrawerRoot>
  )
}
