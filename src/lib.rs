mod output_texture;
mod random;
mod utils;

use crate::output_texture::OutputTexture;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{CanvasRenderingContext2d, HtmlCanvasElement};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct RenderPipelineState {
    canvas: HtmlCanvasElement,
}

#[wasm_bindgen]
impl RenderPipelineState {
    #[wasm_bindgen(constructor)]
    pub fn new(canvas: HtmlCanvasElement) -> RenderPipelineState {
        RenderPipelineState { canvas }
    }

    /// ## NOTE:
    /// Textures with a width or height greater than 2^32 can not be rendered.
    #[wasm_bindgen]
    pub fn render(&self, texture: OutputTexture) -> Result<(), JsValue> {
        let context = self
            .canvas
            .get_context("2d")?
            .unwrap()
            .dyn_into::<CanvasRenderingContext2d>()
            .unwrap();

        context.save();

        context
            .scale(
                f64::from(self.canvas.client_width()) / f64::from(texture.width() as u32),
                f64::from(self.canvas.client_height()) / f64::from(texture.height() as u32),
            )
            .unwrap();

        for (y, row) in texture.into_rows().enumerate() {
            for (x, (r, g, b, a)) in row.into_iter().enumerate() {
                let y = y as u32;
                let x = x as u32;

                let style = JsValue::from(format!("rgba({}, {}, {}, {})", r, g, b, a));

                context.set_fill_style(&style);
                context.fill_rect(f64::from(x), f64::from(y), 1.0, 1.0);

                context.set_stroke_style(&style);
                context.set_line_width(0.05);
                context.stroke_rect(f64::from(x), f64::from(y), 1.0, 1.0);
            }
        }

        context.restore();
        Ok(())
    }
}
