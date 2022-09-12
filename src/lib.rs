mod render_state_descriptor;
mod utils;

use crate::render_state_descriptor::RenderStateDescriptor;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{CanvasRenderingContext2d, HtmlCanvasElement};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

const SQRT3: u64 = 0xBB67AE8584CAA73B;
const SQRT5: u64 = 0x3C6EF372FE94F82B;
const SQRT19: u64 = 0x5BE0CD19137E2179;

pub fn ksink(mut x: u64, mut c: u64) -> u64 {
    for _ in 0..3 {
        c += SQRT3;
        c ^= c.rotate_right(49) ^ c.rotate_right(25);
        x ^= (x >> 47) ^ (x >> 29);
        x += c;
        c *= SQRT5;
        x *= SQRT19;
    }
    x
}

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

    #[wasm_bindgen]
    pub fn render(&self, state: RenderStateDescriptor) -> Result<(), JsValue> {
        let context = self
            .canvas
            .get_context("2d")?
            .unwrap()
            .dyn_into::<CanvasRenderingContext2d>()
            .unwrap();

        context.save();

        context
            .scale(
                f64::from(self.canvas.client_width()) / f64::from(*state.resolution_x()),
                f64::from(self.canvas.client_height()) / f64::from(*state.resolution_y()),
            )
            .unwrap();

        for y in 0..*state.resolution_y() {
            for x in 0..*state.resolution_x() {
                let k = ksink((y as u64) << 32 | (x as u64), *state.seed()) % 16;
                let style = JsValue::from(format!("rgba(0, {}, {}", 17 * k, 17 * (15 - k)));

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
