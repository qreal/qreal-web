export function escapeXml(xml: string) {
    return xml.replace(/&amp;/g, "&").replace(/&/g, "&amp;");
}