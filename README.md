# NordBund Analytics

Eine moderne und sichere Desktop-Anwendung zur Analyse von Schadensdaten, Visualisierung wichtiger Kennzahlen und Erstellung von Finanzberichten.

Entwickelt mit **Tauri (Rust)** und **React (TypeScript)**, bietet sie native Leistung mit einer fortschrittlichen Web-Benutzeroberfläche.

![Dashboard Preview](src-tauri/resources/header.bmp)

---

## 🚀 Hauptfunktionen

*   **Interaktives Dashboard**: Visualisierung von KPIs in Echtzeit.
*   **Zeitliche Analyse**: Trenddiagramme für Kosten und Schäden im Zeitverlauf.
*   **Lokalisierung**: Mehrsprachige Unterstützung (Deutsch, Englisch, Spanisch), mit Deutsch als Standard.
*   **Sicherheit**: Lokale Datenverarbeitung und Verschlüsselung.
*   **Professioneller Installer**:  Vereinfachter nativer Windows-Installer.

---

## 🛠️ Installation

### Option 1: Installer (Empfohlen)
Laden Sie die `.exe`- oder `.msi`-Datei aus dem Releases-Ordner herunter und starten Sie den Assistenten:
1.  Führen Sie `NordBund-setup.exe` aus.
2.  Folgen Sie den Anweisungen auf dem Bildschirm (Sprache ist standardmäßig Deutsch).
3.  Die Anwendung startet automatisch nach Abschluss.

### Option 2: Manuelle Kompilierung (Für Entwickler)

**Voraussetzungen:**
*   Node.js (v16+)
*   Rust (letzte stabile Version)
*   Build Tools für Visual Studio (C++)

**Schritte:**
1.  Repository klonen:
    ```bash
    git clone https://github.com/oscar1457/nordbund-analytics.git
    cd nordbund-analytics
    ```
2.  Abhängigkeiten installieren:
    ```bash
    npm install
    ```
3.  Im Entwicklungsmodus starten:
    ```bash
    npm run tauri dev
    ```
4.  Produktions-Installer generieren:
    ```bash
    npm run tauri build
    ```

---

## 📂 Repository und Quellcode

Der vollständige Quellcode und die technische Dokumentation sind auf GitHub verfügbar:

👉 **[https://github.com/oscar1457/nordbund-analytics](https://github.com/oscar1457/nordbund-analytics)**

---

## 📄 Lizenz
Copyright © 2025 Oscar Quintana. Alle Rechte vorbehalten.
