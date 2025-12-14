// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use std::time::{Duration, Instant};
use std::thread;

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let splashscreen_window = app.get_window("splashscreen").unwrap();
      let main_window = app.get_window("main").unwrap();
      let start_time = Instant::now();

      // SAFETY TIMEOUT: Force close splashscreen after 8 seconds if frontend doesn't load
      let splash_clone = splashscreen_window.clone();
      let main_clone = main_window.clone();
      std::thread::spawn(move || {
          thread::sleep(Duration::from_secs(8));
          // Try to show main window and close splash specifically if it's still around
          // We use unwrap_or(()) to ignore errors if windows are already handled
          let _ = main_clone.show(); 
          let _ = splash_clone.close();
      });

      // We listen for the event from the frontend
      main_window.clone().listen("react-ready", move |_event| {
        let elapsed = start_time.elapsed();
        let min_duration = Duration::from_secs(2); // Reduced to 2s for snappier feel

        // If less than 2 seconds have passed, wait for the remaining time
        if elapsed < min_duration {
          let remaining = min_duration - elapsed;
          thread::sleep(remaining);
        }

        // Close the splashscreen and show the main window
        // Use result handling to avoid panics if timeout already closed it
        let _ = splashscreen_window.close();
        let _ = main_window.show();
      });
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
