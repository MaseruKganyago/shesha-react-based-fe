import { Drawer, Table, Form, Checkbox } from "antd";
import { ColumnsType } from "antd/lib/table";
import { FC, Fragment } from "react";

interface IProps {}

interface DataType {
  period: string;
  numKPI: number;
  target: string;
  actual: string;
}

const FormItemLayout = {
  labelCol: {
    xs: { span: 0 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const FormItem = Form.Item;

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

const KPIDrawerTableForm: FC<IProps> = ({}) => {

  return (
    <Fragment>
      <Table columns={COLUMNS} dataSource={DATA} pagination={false} bordered />

      <div style={{marginBottom:"20px"}}></div>

      <Form {...FormItemLayout} >
        <FormItem label="Achievement" >
          {"Test text"}
        </FormItem>
        <FormItem label="Challenges" >
          {"Test text"}
        </FormItem>
        <FormItem label="Corrective Action" >
          {"Test text"}
        </FormItem>
        <FormItem label="Portfolio of Evidence" >
          {"Test text"}
        </FormItem>
        <FormItem label="Internal Audit" >
          <Checkbox defaultChecked></Checkbox>
        </FormItem>
      </Form>
      </Fragment>
  );
};

export default KPIDrawerTableForm;
