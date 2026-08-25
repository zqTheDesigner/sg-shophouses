/* eslint-disable */
import { Feature, Overlay, View } from "ol";
import { Circle, Point, Polygon } from "ol/geom";

import TileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import { fromLonLat, transform } from "ol/proj";
import { Vector, XYZ } from "ol/source";
import { OverviewMap, defaults as defaultControls } from "ol/control";

import * as layer from "ol/layer";
import * as source from "ol/source";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import CircleStyle from "ol/style/Circle";

import mapDataController from "src/putian/stores/mapDataController";
import appController from "src/putian/stores/appController";
import { getCenter } from "ol/extent";

const { setSidebarTab } = appController;
const { selectMapPoint } = mapDataController;

class MainMap extends Map {
  constructor(target) {
    super({ target: target, controls: defaultControls() });

    /**
     * Popup realated set up
     * refer to : https://stackoverflow.com/questions/74152903/how-to-show-a-popup-when-i-click-on-a-marker-openlayers
     */
    this.popupContainer = document.getElementById("popup");
    this.popupContent = document.getElementById("popup-content");
    this.popupCloser = document.getElementById("popup-closer");

    this.popupOverlay = new Overlay({
      element: this.popupContainer,
    });

    this.addOverlay(this.popupOverlay);

    this.popupCloser.onclick = () => {
      this.popupOverlay.setPosition(undefined);
      this.popupCloser.blur();
      return false;
    };

    this.view = new View({
      center: transform([119.1, 25.45], "EPSG:4326", "EPSG:3857"),
      zoom: 12,
      minZoom: 10,
    });

    // Default using openstreet map street view
    this.source = new XYZ({
      url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    });

    this.setView(this.view);
    this.addLayer(new TileLayer({ source: this.source }));

    this.markerLayers = {};
    this.shapeLayers = {};

    this.markers = {};
    this.shapes = {};

    this.on("click", (evt) => {
      const feature = this.forEachFeatureAtPixel(evt.pixel, (feat) => feat);
      console.log(feature);
      if (feature?.data?.showInfo) {
        setSidebarTab("info"); // Toggle display side bar info
        selectMapPoint(feature.data);
      }
    });

    /**
     * On hover show popup window with alliance name
     */
    this.on("pointermove", (e) => {
      const pixel = this.getEventPixel(e.originalEvent);
      const hit = this.hasFeatureAtPixel(pixel);

      this.getViewport().style.cursor = hit ? "pointer" : "";

      const feature = this.forEachFeatureAtPixel(e.pixel, (feat) => feat);

      if (feature) {
        let coordinates = feature.getGeometry().getCoordinates();
        if (feature?.["center"]) {
          coordinates = feature["center"];
        }
        const label =
          (feature.data?.["NAMEPINYIN"]
            ? feature.data?.["NAMEPINYIN"] + "</br>"
            : "") +
          (feature.data?.["NAMEHANZI"]
            ? feature.data["NAMEHANZI"] + "</br>"
            : "") +
          // Because the data structure is not consistent, have to add additional logic to handle
          // Not researched alliances, this is where the "properties" part come from
          (feature.data?.properties?.["NAME"]
            ? feature.data.properties["NAME"] + "</br>"
            : "") +
          (feature.data?.properties?.["HANZI"]
            ? feature.data.properties["HANZI"] + "</br>"
            : "") +
          (feature.data?.["properties"]?.["name"]
            ? feature.data["properties"]["name"] + "</br>"
            : "") +
          (feature.data?.["properties"]?.["name_zh"]
            ? feature.data["properties"]["name_zh"] + "</br>"
            : "");
        feature.data?.["properties"]?.["township"]
          ? "<b>Township: </b>" +
            feature.data["properties"]["township"] +
            "</br>"
          : "";
        if (label !== "") {
          this.popupContent.innerHTML = label;
          this.popupOverlay.setPosition(coordinates);
        }
      }
    });

    this.on("pointermove", (e) => {
      const feature = this.forEachFeatureAtPixel(e.pixel, (feat) => feat);
      if (!feature) {
        this.popupOverlay.setPosition(undefined);
      }
    });
  }

  setMapTileSource(url) {
    this.source.setUrl(url);
  }

  addMarkers(data, id, option) {
    /**
     * This method is getting overly complex, there supposed to be a much better way to handle
     * this but I didn't have enough time to figure out.
     *
     * The temporarily solution is using feat.data to save the style, when toggle show and hide
     * the marker, read from the saved style
     */
    const styleConfig = { radius: 5 };
    if (option?.style?.["fill"]) {
      styleConfig["fill"] = new Fill(option.style["fill"]);
    } else {
      styleConfig["fill"] = new Fill({ color: "#00838f" });
    }
    if (option?.style?.["stroke"]) {
      styleConfig["stroke"] = new Stroke(option.style["stroke"]);
    }

    if (option?.style?.["highlight-fill"]) {
      styleConfig["fill"] = new Fill(option.style["highlight-fill"]);
    } else {
      styleConfig["fill"] = new Fill({ color: "#00838f" });
    }

    const features = data.map((d) => {
      // Some bug fix - because un-studied data coordinates is a nested array
      let coordinates = d.geometry.coordinates;
      if (coordinates[0] instanceof Array) {
        coordinates = coordinates[0];
      }
      const point = new Point(fromLonLat(coordinates), {
        style: new Style({ fill: new Fill({ color: "red" }) }),
      });

      const feat = new Feature({
        geometry: point,
        // size: 100,
        type: "marker",
      });

      const style = new Style({
        image: new CircleStyle(styleConfig),
      });

      feat.setStyle(style);

      feat.data = d;
      feat.data.showPopup = option.showPopup;
      feat.data.showInfo = option.showInfo;

      feat.data.style = style;

      const highlightStyleConfig = {
        radius: 10,
        fill: new Fill({ color: "#FF6347" }),
      };

      feat.data.highlightStyle = new Style({
        image: new CircleStyle(highlightStyleConfig),
      });

      feat.show = () => feat.setStyle(feat.data.style);
      feat.hide = () =>
        feat.setStyle(new Style({ image: new CircleStyle({ radius: 0 }) }));

      feat.highlight = () => feat.setStyle(feat.data.highlightStyle);

      const markerId = d?.properties?.UID_V ?? null;

      if (markerId) {
        // console.log(markerId)
        this.markers[markerId] = feat;
      }

      return feat;
    });

    const markerLayer = new layer.Vector({
      source: new source.Vector({
        features: features,
      }),
    });

    // Default set visible to false
    markerLayer.setVisible(false);

    this.markerLayers[id] = markerLayer;

    this.addLayer(markerLayer);

    markerLayer.setZIndex(100);
  }

  showMarkers(id) {
    this.markerLayers[id].setVisible(true);
  }

  hideMarkers(id) {
    this.markerLayers[id].setVisible(false);
  }

  addShapes(data, id, option) {
    const features = data.map((d) => {
      const feat = new Feature({
        geometry: new Polygon(d.geometry.coordinates[0]).transform(
          "EPSG:4326",
          "EPSG:3857"
        ),
      });

      feat.data = d.properties;
      feat.data.showPopup = option.showPopup;
      feat.data.showInfo = option.showInfo;
      feat.data.style = new Style({
        stroke: new Stroke({ color: "#00838f", width: 1 }),
        fill: new Fill({ color: "#ffffff70" }),
      });

      if (!option.style) {
        feat.setStyle(feat.data.style);
      }

      const shapeId = d.properties?.["TOWNSHIP"] ?? null;

      feat.center = getCenter(feat.getGeometry().getExtent());

      feat.show = () => {
        console.log("show feature");
        feat.setStyle(feat.data.style);
      };
      feat.hide = () => {};
      feat.highlight = () => {
        // console.log("highlight feture");
        feat.setStyle(
          new Style({
            stroke: new Stroke({ color: "#FF6347", width: 2 }),
            fill: new Fill({ color: "#FF634720" }),
          })
        );
      };

      if (shapeId) {
        this.shapes[shapeId] = feat;
      }

      return feat;
    });

    const shapeLayer = new layer.Vector({
      source: new source.Vector({
        features: features,
      }),
    });

    this.shapeLayers[id] = shapeLayer;
  }

  showShapes(id) {
    this.shapeLayers[id] ? this.addLayer(this.shapeLayers[id]) : null;
  }

  hideShapes(id) {
    this.shapeLayers[id] ? this.removeLayer(this.shapeLayers[id]) : null;
  }

  setShapeStyle(id, style) {
    const config = {};
    if (style["fill"]) {
      config["fill"] = new Fill(style["fill"]);
    }
    if (style["stroke"]) {
      config["stroke"] = new Stroke(style["stroke"]);
    }
    this.shapeLayers[id].setStyle(new Style(config));
  }
}

export { MainMap };
