import { useField } from "formik";
import '/src/app/layout/style.css'

interface Props {
  placeholder: string;
  name: string;
  autoFocus?: boolean
  label?: string;
  type?: string;
}

export default function InputField(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <div className="form__container">
      <input className="form__input" {...field} placeholder={props.placeholder} type={props.type}/>
      {meta.touched && meta.error && <div className="form__input--error">{meta.error}</div>}
    </div>
  )
}
