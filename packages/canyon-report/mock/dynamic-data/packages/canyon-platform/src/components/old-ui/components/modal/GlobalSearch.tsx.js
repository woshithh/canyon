window["packages/canyon-platform/src/components/old-ui/components/modal/GlobalSearch.tsx"] = {"content":"import { forwardRef, useImperativeHandle, useState } from \"react\";\n\nconst { Search } = Input;\nconst CanyonModalGlobalSearch = (props, ref) => {\n  const [open, setOpen] = useState(false);\n\n  useImperativeHandle(ref, () => ({\n    report: () => {\n      setOpen(true);\n    },\n  }));\n\n  return (\n    <Modal\n      closeIcon={false}\n      width={770}\n      open={open}\n      onCancel={() => {\n        setOpen(false);\n      }}\n      onOk={() => {\n        setOpen(false);\n      }}\n      footer={false}\n    >\n      <Search></Search>\n    </Modal>\n  );\n};\n\nexport default forwardRef(CanyonModalGlobalSearch);\n","coverage":{"name":"zt"}}