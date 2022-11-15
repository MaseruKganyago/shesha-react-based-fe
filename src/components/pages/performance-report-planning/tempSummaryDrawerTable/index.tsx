import { ConfigurableForm } from "@shesha/reactjs";
import { Button, Form, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { FC, Fragment } from "react";

interface IProps {}

interface DataType {
  period: string;
  numKPI: number;
  target: string;
  actual: string;
}

const COLUMNS: ColumnsType<DataType> = [
  {
    title: "Period",
    dataIndex: "period",
    key: "period",
  },
  {
    title: "Number of KPI",
    dataIndex: "numKPI",
    key: "numKPI",
  },
  {
    title: "Target",
    dataIndex: "target",
    key: "target",
  },
  {
    title: "Actual",
    dataIndex: "actual",
    key: "actual",
  },
];

const DATA: DataType[] = [
  {
    period: "Apr-Jun",
    numKPI: 7,
    target: "100%",
    actual: "73%",
  },
  {
    period: "Jul-Sep",
    numKPI: 7,
    target: "100%",
    actual: "99%",
  },
];

const TempSummaryDrawerTable: FC<IProps> = ({}) => {
  const [form] = Form.useForm()

  const handleSubmit = () => {
    form.validateFields().then(values => console.log('values :>> ', values))
  }

  return (
    <Fragment>
      <ConfigurableForm
          mode="edit"
          form={form}
          formId={'3968aad2-6b0e-496f-805d-d6118c1b9092'}
        />
        <div style={{ marginBottom: '5px' }} />

        <Button onClick={() => handleSubmit()} >Submit</Button>
    </Fragment>
  );
};

export default TempSummaryDrawerTable;
