import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'PaintingGuessr – Art History Guessing Game';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Decorative corners */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            width: 60,
            height: 60,
            borderTop: '2px solid rgba(201, 168, 76, 0.3)',
            borderLeft: '2px solid rgba(201, 168, 76, 0.3)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            width: 60,
            height: 60,
            borderTop: '2px solid rgba(201, 168, 76, 0.3)',
            borderRight: '2px solid rgba(201, 168, 76, 0.3)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 40,
            width: 60,
            height: 60,
            borderBottom: '2px solid rgba(201, 168, 76, 0.3)',
            borderLeft: '2px solid rgba(201, 168, 76, 0.3)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            width: 60,
            height: 60,
            borderBottom: '2px solid rgba(201, 168, 76, 0.3)',
            borderRight: '2px solid rgba(201, 168, 76, 0.3)',
            display: 'flex',
          }}
        />

        <div style={{ fontSize: 80, marginBottom: 8, display: 'flex' }}>
          🎨
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            display: 'flex',
            gap: 12,
          }}
        >
          <span style={{ color: '#f5f0e8' }}>Painting</span>
          <span style={{ color: '#c9a84c' }}>Guessr</span>
        </div>
        <div
          style={{
            fontSize: 30,
            color: '#c9a84c',
            opacity: 0.6,
            marginTop: 12,
            fontStyle: 'italic',
            display: 'flex',
          }}
        >
          Guess Where. Guess When.
        </div>
        <div
          style={{
            fontSize: 20,
            color: '#f5f0e8',
            opacity: 0.35,
            marginTop: 40,
            display: 'flex',
          }}
        >
          paintingguessr.com
        </div>
      </div>
    ),
    { ...size }
  );
}
