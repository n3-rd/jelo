#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use image::codecs::jpeg::JpegEncoder;
use std::fs::File;
use std::io::BufWriter;
use std::path::Path;

#[tauri::command]
fn compress_image_command(
    input_path: String,
    output_path: String,
    quality: u8,
) -> Result<(), String> {
    let input_path = Path::new(&input_path);
    let output_path = Path::new(&output_path);

    // Load the image.
    let img = image::open(input_path).map_err(|e| e.to_string())?;

    // Create a new file for the output.
    let output_file = File::create(output_path).map_err(|e| e.to_string())?;
    let mut writer = BufWriter::new(output_file);

    // Create a new JPEG encoder.
    let mut encoder = JpegEncoder::new_with_quality(&mut writer, quality);

    // Write the image to the encoder.
    encoder.encode_image(&img).map_err(|e| e.to_string())?;

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![compress_image_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
