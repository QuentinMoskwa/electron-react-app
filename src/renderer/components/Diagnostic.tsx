import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { runDiagnostic } from '../../services/diagnosticService'; // Importer la fonction du service

const Diagnostic: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState<{
    cpu: string;
    memory: string;
    diskC: string;
    diskD: string;
  } | null>(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    handleRunDiagnostic();
  }, []);

  const handleRunDiagnostic = async () => {
    setIsAnalyzing(true);
    setDiagnosticResults(null);
    setProgress(0);

    try {
      const results = await runDiagnostic((newProgress) => {
        setProgress(newProgress);
      });
      setDiagnosticResults(results as { cpu: string; memory: string; diskC: string; diskD: string; }); // Mettre à jour les résultats
    } catch (error) {
      console.error("Erreur lors de l'exécution du diagnostic:", error);
    } finally {
      console.log('Diagnostic terminé');
      setIsAnalyzing(false);
      setProgress(100); // Assurez-vous que la progression soit à 100% à la fin.
    }
  };

  return (
    <div className="diagnostic-container">
      <h2>Diagnostic de Santé</h2>
      {isAnalyzing ? (
        <div>
          <div className="analyzing">Analyse en cours...</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-text">{Math.round(progress)}% complété</div>
        </div>
      ) : diagnosticResults ? (
        <div className="results">
          <div className="result-item">
            <strong>{diagnosticResults.cpu}</strong>
          </div>
          <div className="result-item">
            <strong>{diagnosticResults.memory}</strong>
          </div>
          <div className="result-item">
            <strong>{diagnosticResults.diskC}</strong>
          </div>
          <div className="result-item">
            <strong>{diagnosticResults.diskD}</strong>
          </div>
        </div>
      ) : (
        <div className="waiting">Diagnostic en attente...</div>
      )}
      <button onClick={() => navigate('/')}>Retour au Dashboard</button>
    </div>
  );
};

export default Diagnostic;
