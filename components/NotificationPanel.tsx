import React from 'react';
import { Anomaly, Language } from '../types';
import { AlertTriangle, X, CheckCircle, Info } from 'lucide-react';
import { translations as globalTranslations } from '../utils/translations';

const getAnomalyReason = (anomaly: Anomaly, lang: Language): string => {
    const t = (globalTranslations[lang] as any).anomalies;
    if (!t) return anomaly.reason;

    // 1. New metadata-based system (preferred)
    if (anomaly.type === 'HIGH_PRICE' && anomaly.metadata?.avg) {
        return t.highPrice(anomaly.metadata.avg);
    }

    // 2. Legacy string detection (for stale data in history or older uploads)
    // Detects "Price above average" or equivalent in any of the 3 languages
    const r = anomaly.reason.toLowerCase();
    const isHighPriceLegacy =
        r.includes('promedio') || // es
        r.includes('average') ||  // en
        r.includes('durchschnitt'); // de

    if (isHighPriceLegacy) {
        // Try to extract the average value from the existing string (e.g. €1174)
        const match = anomaly.reason.match(/€(\d+)/);
        const avg = match ? match[1] : (anomaly.metadata?.avg || "---");
        if (t.highPrice) return t.highPrice(avg);
    }

    return anomaly.reason; // Final fallback
};
interface NotificationPanelProps {
    anomalies: Anomaly[];
    lang: Language;
    onClose: () => void;
    isOpen: boolean;
}

const translations = {
    es: {
        title: "Hallazgos Críticos",
        empty: "No hay anomalías detectadas",
        viewAll: "Ver todo en Análisis",
        dismiss: "Cerrar",
        findings: "Hallazgos",
        anomalyLabel: "Anomalía"
    },
    en: {
        title: "Critical Findings",
        empty: "No anomalies detected",
        viewAll: "View all in Analytics",
        dismiss: "Dismiss",
        findings: "Findings",
        anomalyLabel: "Anomaly"
    },
    de: {
        title: "Kritische Befunde",
        empty: "Keine Anomalien erkannt",
        viewAll: "Alles in Analyse ansehen",
        dismiss: "Schließen",
        findings: "Befunde",
        anomalyLabel: "Anomalie"
    }
};

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
    anomalies,
    lang,
    onClose,
    isOpen
}) => {
    if (!isOpen) return null;

    const t = translations[lang];

    return (
        <>
            {/* Backdrop for mobile or closing on click outside */}
            <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={onClose}
            />

            <div className="notification-panel fixed top-20 right-6 w-80 lg:w-96 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 z-50 animate-in zoom-in fade-in duration-300 overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                            <AlertTriangle size={18} className="text-red-500" />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                            {t.title}
                        </h3>
                        {anomalies.length > 0 && (
                            <span className="text-[10px] bg-red-500 text-white font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                {anomalies.length}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <X size={16} className="text-slate-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="max-h-[70vh] overflow-y-auto custom-scrollbar p-4 space-y-3 bg-white dark:bg-slate-900">
                    {anomalies.length > 0 ? (
                        anomalies.map((anomaly) => (
                            <div
                                key={anomaly.id}
                                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100/50 dark:border-slate-700/50 hover:border-red-200 dark:hover:border-red-900/40 transition-colors group"
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-50 dark:bg-red-900/40 px-2 py-0.5 rounded-full">
                                        {t.anomalyLabel}: {anomaly.item}
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                                        €{anomaly.cost.toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                    "{getAnomalyReason(anomaly, lang)}"
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="py-10 text-center">
                            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <CheckCircle size={24} className="text-green-500" />
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                {t.empty}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {anomalies.length > 0 && (
                    <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                        <button
                            onClick={onClose}
                            className="w-full py-2.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <Info size={14} />
                            {t.viewAll}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
