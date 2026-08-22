import Learning from "./Learning";

/**
 * Dedicated public mission surface. The atlas owns course discovery; this route
 * owns the selected unit's first mission and its optional media/support actions.
 */
export default function Mission() {
  return <Learning mode="mission" />;
}
