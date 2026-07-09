import type { Project } from "../types/project";

const projectModules = import.meta.glob("./projects/*.json", {
  eager: true,
  import: "default",
}) as Record<string, Project>;

function slugFromPath(path: string) {
  return path.split("/").pop()?.replace(/\.json$/, "") ?? "";
}

function list<T>(value: T[] | undefined) {
  return Array.isArray(value) ? value : [];
}

export const projects = Object.entries(projectModules)
  .map(([path, project]) => {
    const slug = project.slug || project.id || slugFromPath(path);
    return {
      ...project,
      id: project.id || slug,
      slug,
      videoUrl: project.videoUrl ?? "",
      coverVideo: project.coverVideo ?? "",
      role: list(project.role),
      tools: list(project.tools),
      services: list(project.services),
      results: list(project.results),
      gallery: list(project.gallery),
      credits: list(project.credits),
      order: project.order ?? 999,
      status: project.status ?? "published",
    };
  })
  .filter((project) => project.status === "published")
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
