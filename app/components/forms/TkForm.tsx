import { Formik, FormikHelpers } from 'formik'
import { AnySchema } from 'yup'

import { commonProps } from '@/TkProps'

interface TkFormProps extends commonProps {
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => Promise<any>
  initialValues: any
  validationSchema: AnySchema
}

export default function TkForm(props: TkFormProps) {
  const { initialValues, onSubmit, validationSchema, children } = props
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  )
}
