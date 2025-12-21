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
      
      // Use Tauri's async runtime or a separate thread to avoid blocking main thread setup
      std::thread::spawn(move || {
          thread::sleep(Duration::from_secs(8));
          // If windows are still open, this will close them. If processed, it's a no-op/error we ignore.
          let _ = main_clone.show(); 
          let _ = splash_clone.close();
      });

      // We listen for the event from the frontend
      main_window.clone().listen("react-ready", move |_event| {
        let elapsed = start_time.elapsed();
        let min_duration = Duration::from_secs(2);
        
        let splash_clone_inner = splashscreen_window.clone();
        let main_clone_inner = main_window.clone();

        // If less than 2 seconds have passed, we must wait asynchronously, NOT block the thread
        if elapsed < min_duration {
          let remaining = min_duration - elapsed;
          std::thread::spawn(move || {
             thread::sleep(remaining);
             let _ = splash_clone_inner.close();
             let _ = main_clone_inner.show();
          });
        } else {
             let _ = splash_clone_inner.close();
             let _ = main_clone_inner.show();
        }
      });
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
