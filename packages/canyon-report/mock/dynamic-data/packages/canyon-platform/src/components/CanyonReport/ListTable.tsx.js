window["packages/canyon-platform/src/components/CanyonReport/ListTable.tsx"] = {"content":"import Highlighter from \"react-highlight-words\";\n\nimport { getCOlor, percent } from \"../../helpers/utils/common.ts\";\nconst CanyonReportListTable = ({\n  dataSource,\n  loading,\n  keywords,\n  onSelect,\n  onlyChange,\n}) => {\n  const { t } = useTranslation();\n  const newlinesColumns = onlyChange\n    ? [\n        {\n          title: t(\"projects.newlines\"),\n          width: \"240px\",\n          sorter: (a, b) => {\n            return (\n              percent(a.newlines.covered, a.newlines.total) -\n              percent(b.newlines.covered, b.newlines.total)\n            );\n          },\n          // key: 'total',\n          dataIndex: [\"newlines\", \"total\"],\n          render(text, record) {\n            return (\n              <Space>\n                <Progress\n                  percent={percent(\n                    record.newlines.covered,\n                    record.newlines.total,\n                  )}\n                  strokeLinecap=\"butt\"\n                  size={\"small\"}\n                  style={{ width: \"100px\" }}\n                  strokeColor={getCOlor(\n                    percent(record.newlines.covered, record.newlines.total),\n                  )}\n                  className={\"pr-5\"}\n                  status={\"normal\"}\n                />\n                <span style={{ fontSize: \"10px\" }}>\n                  ({record.newlines.covered}/{record.newlines.total})\n                </span>\n              </Space>\n            );\n          },\n        },\n        // {\n        //   title: 'covered',\n        //   key: 'covered',\n        //   dataIndex: ['summary', 'newlines', 'covered'],\n        // },\n      ]\n    : [];\n  return (\n    <div>\n      <ConfigProvider\n        theme={{\n          token: {\n            borderRadius: 0,\n          },\n        }}\n      >\n        {\" \"}\n        <Table\n          bordered={true}\n          pagination={{\n            defaultPageSize: 15,\n          }}\n          // pagination={false}\n          size={\"small\"}\n          dataSource={dataSource}\n          loading={loading}\n          columns={[\n            {\n              title: t(\"projects.detail.files\"),\n              key: \"path\",\n              dataIndex: \"path\",\n              // width: '200px',\n              render(text) {\n                return (\n                  <a\n                    className={\"block break-words w-[420px]\"}\n                    onClick={() => {\n                      onSelect({\n                        path: text,\n                      });\n                    }}\n                  >\n                    <Highlighter\n                      highlightClassName=\"YourHighlightClass\"\n                      searchWords={[keywords]}\n                      autoEscape={true}\n                      textToHighlight={text}\n                    />\n                  </a>\n                );\n              },\n            },\n            {\n              title: t(\"common.total\"),\n              key: \"total\",\n              dataIndex: [\"statements\", \"total\"],\n              sorter(a, b) {\n                return a.statements.total - b.statements.total;\n              },\n            },\n            {\n              title: t(\"common.covered\"),\n              key: \"covered\",\n              dataIndex: [\"statements\", \"covered\"],\n              sorter(a, b) {\n                return a.statements.covered - b.statements.covered;\n              },\n            },\n          ]\n            .concat(newlinesColumns)\n            .concat([\n              {\n                title: t(\"projects.config.coverage\") + \" %\",\n                width: \"300px\",\n                key: \"c\",\n                sorter: (a, b) => {\n                  return a.statements.pct - b.statements.pct;\n                },\n                dataIndex: [\"statements\", \"pct\"],\n                render(text) {\n                  return (\n                    <Progress\n                      percent={text}\n                      strokeLinecap=\"butt\"\n                      size={\"small\"}\n                      strokeColor={getCOlor(text)}\n                      className={\"pr-5\"}\n                      status={\"normal\"}\n                    />\n                  );\n                },\n              },\n            ])}\n        />\n      </ConfigProvider>\n    </div>\n  );\n};\n\nexport default CanyonReportListTable;\n","coverage":{"name":"zt"}}