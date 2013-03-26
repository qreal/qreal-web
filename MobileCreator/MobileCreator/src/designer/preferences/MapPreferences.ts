import mElementPreferences = module("designer/preferences/ElementPreferences");

export class MapPreferences extends mElementPreferences.ElementPreferences {
    private mapId: string;
    get MapId() {
        return this.mapId;
    }
    set MapId(mapId: string) {
        this.mapId = mapId;
    }
}