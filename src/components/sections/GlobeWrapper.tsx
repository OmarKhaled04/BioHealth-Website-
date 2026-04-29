import { forwardRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

export interface GlobePoint { name: string; lat: number; lng: number; }

interface GeoFeature {
  properties: { name?: string; NAME?: string };
}

export interface GlobeWrapperProps {
  width: number;
  height: number;
  activePoints: GlobePoint[];
  selectedCountryName: string | null;
  onGlobeReady?: () => void;
}

// Created once at module level — stable reference, never recreated on re-render
const GLOBE_MATERIAL = new THREE.MeshPhongMaterial({
  color: new THREE.Color('#5b21b6'),
  emissive: new THREE.Color('#3b0764'),
  emissiveIntensity: 0.2,
  shininess: 12,
  transparent: true,
  opacity: 0.95,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GlobeWrapper = forwardRef<any, GlobeWrapperProps>(function GlobeWrapper(
  { width, height, activePoints, selectedCountryName, onGlobeReady },
  ref,
) {
  const [countries, setCountries] = useState<{ features: GeoFeature[] }>({ features: [] });

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/DATA/world.geojson')
      .then((r) => r.json())
      .then(setCountries)
      .catch(() => {}); // globe renders fine without country outlines if fetch fails
  }, []);

  function getCountryName(feat: object): string {
    const f = feat as GeoFeature;
    return f.properties.name ?? f.properties.NAME ?? '';
  }

  function isSelected(feat: object): boolean {
    return !!selectedCountryName && getCountryName(feat) === selectedCountryName;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyRef = ref as any;
  return (
    <Globe
      ref={anyRef}
      width={width}
      height={height}
      globeImageUrl=""
      globeMaterial={GLOBE_MATERIAL}
      backgroundColor="rgba(0,0,0,0)"
      showGraticules={true}
      atmosphereColor="rgba(139,92,246,0.4)"
      atmosphereAltitude={0.15}
      onGlobeReady={onGlobeReady}
      polygonsData={countries.features}
      polygonCapColor={(feat) =>
        isSelected(feat) ? 'rgba(250,204,21,0.3)' : 'rgba(91,33,182,0.5)'
      }
      polygonSideColor={() => 'rgba(109,40,217,0.25)'}
      polygonStrokeColor={(feat) =>
        isSelected(feat) ? '#facc15' : 'rgba(255,255,255,0.15)'
      }
      polygonAltitude={(feat) => (isSelected(feat) ? 0.02 : 0.002)}
      pointsData={activePoints}
      pointLat="lat"
      pointLng="lng"
      pointAltitude={0.07}
      pointColor={() => '#facc15'}
      pointRadius={0.6}
      pointLabel="name"
    />
  );
});

export default GlobeWrapper;
