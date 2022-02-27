import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() lat: number;
  @Input() lng: number;
  @Input() gradus: number;

  managerOptions = {
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ['polygon']
    },
    polygonOptions: {
      draggable: true,
      editable: true
    },
    drawingMode: "polygon"
  };

  prevIt;

  // lat = 21.3069;

  markers = [];
  // lng = -157.8583;

  mapType = 'satellite';

  drawingManager;
  selectedMarker = null;

  line;
  map;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.form.valueChanges.subscribe((values) => {
      this.lat = values.lat;
      this.lng = values.lng;
      this.markers = [values];
      this.initDrawingManager(this.map);
    });
  }

  onMapReady(map) {
    this.initDrawingManager(map);
    this.map = map;
  }

  initDrawingManager(map: any) {
    if (this.markers.length) {
      if (this.prevIt) {
        this.prevIt.setMap(null);
      }
      const find = this.findCoords(this.markers[0].lat, this.markers[0].lng, this.markers[0].azim);
      var myCoordinates = [
        new google.maps.LatLng(this.markers[0].lat, this.markers[0].lng),
        new google.maps.LatLng(find[0], find[1]),
        new google.maps.LatLng(find[2], find[3]),
      ];
      var polyOptions = {
        path: myCoordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.6
      }
      var it = new google.maps.Polygon(polyOptions);
      this.prevIt = it;
      it.setMap(map);
    }
  }

  findCoords(lat, lang, azim): any[] {
    const staticVel = 60;

    const [x1, y1] = [lat, lang];
    const S = 1;
    let x2, y2, x3, y3;
    if (azim > 0 && azim < 91) {
      [x2, y2] = [x1 + (S * Math.cos(azim - staticVel)), y1 + (S * Math.sin(azim - staticVel))];
      [x3, y3] = [x1 + (S * Math.cos(azim + staticVel)), y1 + (S * Math.sin(azim + staticVel))];
    } else if (azim > 90 && azim < 181) {
      [x2, y2] = [x1 - (S * Math.cos(azim - staticVel)), y1 + (S * Math.sin(azim - staticVel))];
      [x3, y3] = [x1 - (S * Math.cos(azim + staticVel)), y1 + (S * Math.sin(azim + staticVel))];
    } else if (azim > 180 && azim < 270) {
      [x2, y2] = [x1 - (S * Math.cos(azim - staticVel)), y1 - (S * Math.sin(azim - staticVel))];
      [x3, y3] = [x1 - (S * Math.cos(azim + staticVel)), y1 - (S * Math.sin(azim + staticVel))];
    } else if (azim > 270 && azim < 361) {
      [x2, y2] = [x1 + (S * Math.cos(azim - staticVel)), y1 - (S * Math.sin(azim - staticVel))];
      [x3, y3] = [x1 + (S * Math.cos(azim + staticVel)), y1 - (S * Math.sin(azim + staticVel))];
    }

    return [x2, y2, x3, y3];
  }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
    // this.draw(this.selectedMarker);
  }

  draw({lat, lng}): void {
    const locationArray = [].map(
      (l) => new google.maps.LatLng(l[0], l[1])
    );
    this.line = new google.maps.Polyline({
      strokeOpacity: 0.5,
      path: [],
      map: this.map,
    });
    locationArray.forEach((l) => this.line.getPath().push(l));
  }

  max(coordType: string) {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: string) {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  }
}
