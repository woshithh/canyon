import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const projectID = searchParams.get("project_id");
  const sha = searchParams.get("sha");
  const filepath = searchParams.get("filepath");

  // 必须projectID、sha、filepath都存在
  if (!projectID || !sha || !filepath) {
    return Response.error();
  }
  const [provider, id, slug] = projectID.split("-");
  const gitProvider = await prisma.gitProvider.findFirst({
    where: {
      id: provider,
    },
  });
  if (gitProvider) {
    const { url, privateToken } = gitProvider;
    // TODO: 从gitlab获取文件内容，还去要判断provider type，例如github。
    const fileContent = await axios
      .get(`${url}/api/v4/projects/${id}/repository/files/${filepath}`, {
        params: {
          ref: sha,
        },
        headers: {
          // Authorization: `Bearer ${token}`,
          "private-token": privateToken,
        },
      })
      .then(({ data }) => data);
    return Response.json(fileContent);
  } else {
    return Response.error();
  }
}
