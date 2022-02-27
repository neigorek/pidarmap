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

  radius = 6371000;
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

  constructor(private service: ServiceService) {
  }

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
      let myCoordinates = [
        new google.maps.LatLng(this.markers[0].lat, this.markers[0].lng),
        new google.maps.LatLng(find[0], find[1]),
        new google.maps.LatLng(find[2], find[3]),
      ];
      let polyOptions = {
        path: myCoordinates,
        strokeColor: "#ffdd00",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.4
      }
      let it = new google.maps.Polygon(polyOptions);
      this.prevIt = it;
      it.setMap(map);
    }
  }

  findCoords(lat, lang, azim): any[] {
    const staticVel = 60;
    const S = 10000;
    let x2, y2, x3, y3;
    const k_lat = (Math.PI * this.radius) / 180;
    const k_lang = (Math.PI * this.radius * Math.sin(this.degreesToRadians(lat))) / 180;

    x2 = S * Math.sin(this.degreesToRadians(azim - staticVel));
    y2 = S * Math.cos(this.degreesToRadians(azim - staticVel));

    x3 = S * Math.sin(this.degreesToRadians(azim + staticVel));
    y3 = S * Math.cos(this.degreesToRadians(azim + staticVel));

    const [lat2, lang2, lat3, lang3] = [
      lat + y2 / k_lat,
      lang + x2 / k_lang,
      lat + y3 / k_lat,
      lang + x3 / k_lang,
    ];
    return [lat2, lang2, lat3, lang3];
  }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
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

  degreesToRadians(degrees) {
    var pi = Math.PI;
    return degrees * (pi/180);
  }
}
