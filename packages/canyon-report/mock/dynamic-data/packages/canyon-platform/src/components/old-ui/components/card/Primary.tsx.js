window["packages/canyon-platform/src/components/old-ui/components/card/Primary.tsx"] = {"content":"import { FC } from \"react\";\n\nconst { useToken } = theme;\nconst CanyonCardPrimary: FC<{\n  theme?: any;\n  language?: any;\n  children: any;\n}> = ({ theme, language, children }) => {\n  const { token } = useToken();\n  return (\n    <div\n      className={\"rounded-[8px] overflow-hidden\"}\n      style={{\n        border: `1px solid ${token.colorBorder}`,\n        boxShadow: `${token.boxShadowTertiary}`,\n      }}\n    >\n      {children}\n    </div>\n  );\n};\n\nexport default CanyonCardPrimary;\n","coverage":{"name":"zt"}}