import React, { useState } from 'react';
import { MAPS } from 'src/constants/maps';
import styles from '../app.module.css';
import { MapResult } from '../models/maps';
import { validateAndReadMap } from '../utils/utils';

const MapReader: React.FC = () => {
  const [result, setResult] = useState<MapResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const readMap = (map: string[][]) => {
    try {
      const traversalResult = validateAndReadMap(map);
      setResult(traversalResult);
      setError(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
      setResult(null);
    }
  };

  return (
    <>
      <h4>Select map to read letters and path</h4>
      <div className={styles.mapsContent}>
        {MAPS.map((map, index) => (
          <div
            key={index}
            onClick={() => readMap(map)}
            className={styles.mapsSelection}
            data-testid={`map-${index}`}
          >
            <pre>
              {map.map((row, rowIndex) => (
                <div key={rowIndex}>{row.join('')}</div>
              ))}
            </pre>
          </div>
        ))}
      </div>

      {result && (
        <div>
          <p>Letters: {result.letters}</p>
          <p>Path: {result.path}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </>
  );
};

export default MapReader;
