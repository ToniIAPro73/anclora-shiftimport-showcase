import { useCallback, useEffect, useRef, useState } from 'react';
import CalendarView from './components/CalendarView';
import Footer from './components/Footer';
import Header from './components/Header';
import ImportPanel from './components/ImportPanel';
import Intro from './components/Intro';
import PreviewTable from './components/PreviewTable';
import ProcessingPanel from './components/ProcessingPanel';
import { buildDemoRows, type RowCode, type ShiftRow } from './data/demoData';

type Step = 'idle' | 'processing' | 'preview' | 'calendar';

export default function App() {
  const [step, setStep] = useState<Step>('idle');
  const [source, setSource] = useState('');
  const [rows, setRows] = useState<ShiftRow[]>([]);
  const mainRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step !== 'idle') {
      flowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const startImport = (src: string) => {
    setSource(src);
    setRows([]);
    setStep('processing');
  };

  const handleProcessed = useCallback(() => {
    setRows(buildDemoRows());
    setStep('preview');
  }, []);

  const changeCode = (rowId: string, code: RowCode) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId
          ? { ...r, code, status: code === 'XX' ? 'review' : 'resolved' }
          : r,
      ),
    );
  };

  const confirm = () => {
    setStep('calendar');
  };

  const reset = () => {
    setStep('idle');
    setRows([]);
    setSource('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <main ref={mainRef}>
        <Intro />
        <ImportPanel onLoadExample={startImport} disabled={step === 'processing'} />
        <div ref={flowRef} className="flow-anchor" aria-live="polite">
          {step === 'processing' && <ProcessingPanel source={source} onDone={handleProcessed} />}
          {(step === 'preview' || step === 'calendar') && (
            <PreviewTable rows={rows} onChangeCode={changeCode} onConfirm={confirm} />
          )}
          {step === 'calendar' && <CalendarView rows={rows} onReset={reset} />}
        </div>
      </main>
      <Footer />
    </>
  );
}
