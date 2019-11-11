import React from 'react';
import {useFormik} from 'formik';


interface Props {
  onSubmit: (formData: any) => void
  current: any
}

const PlaydayEditForm: React.FC<Props> = ({onSubmit, current}) => {


  const formik = useFormik({
    initialValues: {
      res1: current.goals[0],
      res2: current.goals[1]
    },
    onSubmit: values => {
      onSubmit(values)
    }
  });

  if (!current) return null;

  return (
      <div>
        <form className={`playday-edit-form mb-3`} onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-4 mt-3 mt-md-0">
              <input
                  className="form-control"
                  placeholder="Голы"
                  name="res1"
                  value={formik.values.res1}
                  onChange={formik.handleChange}
                  autoComplete="off"
              />
            </div>

            <div className="col-md-4 mt-3 mt-md-0">
              <input
                  className="form-control"
                  placeholder="Голы"
                  name="res2"
                  value={formik.values.res2}
                  onChange={formik.handleChange}
                  autoComplete="off"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <button className="btn btn-primary">Сохранить</button>
            </div>
          </div>
        </form>
      </div>
  );
};

export default PlaydayEditForm;
