"use client";
import ReactECharts from "echarts-for-react";
import { Input, Space, Spin, Table, Tag, theme, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import MainBox from "@/components/wget/layout/main-box";
import useSWR from "swr";
import axios from "axios";
import { useParams } from "next/navigation";
import WithTheme from "@/theme";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const getProjectCompartmentData = [
  {
    label: "name",
    value: "100",
  },
  {
    label: "name",
    value: "100",
  },
  {
    label: "name",
    value: "100",
  },
  {
    label: "name",
    value: "100",
  },
];

const fetcher = ({ url, params }: { url: string; params: any }) =>
  axios
    .get(url, {
      params: params,
    })
    .then((res) => res.data);

const { useToken } = theme;
const t = (msg) => msg;

// http://localhost:3000/projects/tripgl/62940/auto

const ProjectOverviewPage = () => {
  const option = {
    backgroundColor: "transparent",
    grid: {
      top: "30px",
      left: "30px",
      right: "10px",
      bottom: "20px",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      x: "right",
      data: [t("projects.statements"), t("projects.newlines")],
    },
    xAxis: {
      type: "category",
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [t("projects.statements"), t("projects.newlines")].map(
      (_, index) => ({
        name: _,
        data: [],
        type: "line",
      }),
    ),
  };
  const { filepath, id, sha, provider, slug } = useParams(); // 获取动态路由参数
  // console.log(id)
  // 非常重要的一步，获取整体覆盖率数据
  const { data: record } = useSWR(
    {
      url: `/api/project/${id}/record`,
    },
    fetcher,
  );

  const { data: projectData,isLoading } = useSWR(
    {
      url: `/api/project/${provider}-${id}-${slug}`,
    },
    fetcher,
  );

  const { token } = useToken();
  const columns: ColumnsType<any> = [
    {
      title: (
        <div>
          {/*<Icon component={MaterialSymbolsCommitSharp} className={"mr-1"} />*/}
          Sha
        </div>
      ),
      dataIndex: "sha",
      width: "100px",
      render(_, { webUrl }): JSX.Element {
        return (
          <Link href={`/projects/tripgl/${id}/auto/commits/${_}`}>
            {_?.slice(0, 7)}
          </Link>
        );
      },
    },
    {
      title: (
        <>
          {/*<BranchesOutlined className={"mr-1"} />*/}
          {"Branch"}
        </>
      ),
      dataIndex: "branch",
      ellipsis: true,
      width: "120px",
    },
    {
      title: t("Message"),
      dataIndex: "message",
      width: "160px",
      ellipsis: true,
    },
    {
      title: (
        <div>
          {/*<Tooltip title={t("statements_tooltip")} className={"mr-2"}>*/}
          {/*  <QuestionCircleOutlined />*/}
          {/*</Tooltip>*/}
          {"Statements"}
        </div>
      ),
      dataIndex: "statements",
      // width: '148px',
      render(_, { sha }) {
        return (
          <Link href={`/projects/tripgl/${id}/auto/commits/${sha}`}>{_}%</Link>
        );
      },
    },
    {
      title: "Report Times",
      dataIndex: "times",
      // width: "80px",
    },
    {
      title: "Latest Report Time",
      dataIndex: "lastReportTime",
      // width: "135px",
      render(_) {
        return <span>{dayjs(_).format("MM-DD HH:mm")}</span>;
      },
    },
    {
      title: "Option",
      width: "125px",
      render(_): JSX.Element {
        return (
          <div>
            <a
              onClick={() => {
                // setOpen(true);
                // setSha(_.sha);
              }}
            >
              {"Details"}
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <MainBox>
      <div>
        <div className={"mb-10"}>
          <div className={"flex"}>
            <Title level={2}>
              {projectData?.pathWithNamespace}
              <EditOutlined
                className={"ml-3 cursor-pointer text-[#0071c2]"}
                style={{ fontSize: "20px", color: "#0071c2" }}
                onClick={() => {
                  // nav(`/projects/${pam.id}/configure`);
                }}
              />
            </Title>
          </div>

          <div>
            <Text type={"secondary"}>
              {t("Project ID")}: {projectData?.id}
            </Text>
            <Text className={"ml-6"} type={"secondary"}>
              {t("Default Branch")}: {projectData?.defaultBranch}
            </Text>
          </div>

          {(projectData?.tags || []).length > 0 && (
            <div className={"pt-5"}>
              <Text className={"mr-3"} type={"secondary"}>
                {t("Tag")}:
              </Text>
              {projectData?.tags.map(({ color, name, link }, index) => (
                <Tag
                  style={{ cursor: link ? "pointer" : "default" }}
                  key={index}
                  color={color}
                  onClick={() => {
                    if (link) {
                      window.open(link);
                    }
                  }}
                >
                  {name}
                </Tag>
              ))}
            </div>
          )}
        </div>

        <span
          className={"block mb-3"}
          style={{ fontWeight: 500, fontSize: 16 }}
        >
          {"Overview"}
        </span>

        <div className={"flex mb-10"}>
          <Spin spinning={false}>
            <div
              className={`[list-style:none] grid grid-cols-[repeat(2,_215px)] grid-rows-[repeat(2,_1fr)] gap-[16px] h-full mr-[16px]`}
            >
              {(getProjectCompartmentData || []).map((item, index) => {
                return (
                  <div
                    className={
                      "p-[20px] h-[150px] flex justify-between flex-col bg-white dark:bg-[#0C0D0E]"
                    }
                    style={{
                      border: `1px solid ${token.colorBorder}`,
                      borderRadius: `${token.borderRadius}px`,
                    }}
                    key={index}
                  >
                    <span>{item.label}</span>
                    <span className={"text-xl"}>{item.value}</span>
                  </div>
                );
              })}
            </div>
          </Spin>

          <div style={{ flex: 1 }}>
            <Spin spinning={false}>
              <div
                className={"p-[18px] bg-white dark:bg-[#0C0D0E]"}
                style={{
                  border: `1px solid ${token.colorBorder}`,
                  borderRadius: `${token.borderRadius}px`,
                }}
              >
                <div className={"flex items-center"}>
                  <span level={5} style={{ marginBottom: "0" }}>
                    {"Trends in coverage"}
                  </span>
                  <span
                    type={"secondary"}
                    className={"ml-2"}
                    style={{ fontSize: 12 }}
                  >
                    {"Tooltip"}
                  </span>
                </div>
                <ReactECharts
                  theme={{
                    color: ["#287DFA", "#FFB400"],
                  }}
                  style={{ height: "254px" }}
                  option={option}
                />
              </div>
            </Spin>
          </div>
        </div>

        <span
          className={"block mb-3"}
          style={{ fontWeight: 500, fontSize: 16 }}
        >
          {"Records"}
        </span>
        <div
          className={"flex"}
          style={{ marginBottom: "16px", justifyContent: "space-between" }}
        >
          <div className={"flex items-center gap-5"}>
            <Input.Search
              defaultValue={""}
              placeholder={"overview_search_keywords"}
              onSearch={(value) => {
                // setKeyword(value);
                // setCurrent(1);
              }}
              style={{ width: "600px" }}
            />
            <Space>
              <span type={"secondary"}>{"Only Default Branch"}: </span>
              {/*<Switch*/}
              {/*  defaultChecked={Boolean(*/}
              {/*    localStorage.getItem("defaultBranchOnly"),*/}
              {/*  )}*/}
              {/*  onChange={(v) => {*/}
              {/*    if (v) {*/}
              {/*      localStorage.setItem("defaultBranchOnly", "1");*/}
              {/*    } else {*/}
              {/*      localStorage.removeItem("defaultBranchOnly");*/}
              {/*    }*/}
              {/*    // setDefaultBranchOnly(v);*/}
              {/*  }}*/}
              {/*/>*/}
            </Space>
          </div>
        </div>
        {/*div*/}
        <Table
          loading={isLoading}
          style={{
            border: `1px solid ${token.colorBorder}`,
            borderRadius: `${token.borderRadius}px`,
          }}
          bordered={false}
          rowKey={"sha"}
          columns={columns}
          pagination={
            {
              // showTotal: (total) => t("common.total_items", {total}),
              // total: projectsData?.getProjectRecords?.total,
              // current,
              // pageSize,
              // current: projectsData?.getProjects?.current,
              // pageSize: projectsData?.getProjects?.pageSize,
            }
          }
          dataSource={record}
          onChange={(val) => {
            // setCurrent(val.current || 1);
            // setPageSize(val.pageSize || 10);
            // setKeyword(keyword);
          }}
        />

        {/*默太狂就共用一个*/}
        {/*<ProjectRecordDetailDrawer open={open} onClose={onClose} sha={sha}/>*/}
      </div>
    </MainBox>
  );
};

export default () => WithTheme(<ProjectOverviewPage />);
