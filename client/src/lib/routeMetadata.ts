export type RouteMetadata = {
  announcement: string;
  title: string;
};

const baseTitle = "fleshsesh | academy";

export function getRouteMetadata(location: string): RouteMetadata {
  if (location === "/") return { announcement: "eCampus home", title: `${baseTitle} — adult learning for bodies` };
  if (location === "/orientation") return { announcement: "course orientation", title: `${baseTitle} — course orientation` };
  if (location === "/learn") return { announcement: "learning atlas", title: `${baseTitle} — learning atlas` };
  if (location === "/member") return { announcement: "member workspace", title: `${baseTitle} — member workspace` };
  if (location === "/member/achievements") return { announcement: "achievement archive", title: `${baseTitle} — achievement archive` };
  if (location === "/care") return { announcement: "care navigation", title: `${baseTitle} — care navigation` };
  if (location === "/campus/esports/readiness") return { announcement: "Arena connector readiness", title: `${baseTitle} — Arena connector readiness` };
  if (location === "/campus") return { announcement: "campus hub", title: `${baseTitle} — campus` };
  if (location.startsWith("/campus/")) return { announcement: "campus facility room", title: `${baseTitle} — campus facility` };
  return { announcement: "fleshsesh academy", title: baseTitle };
}
