mod utils;

use wasm_bindgen::prelude::*;

const SQRT3: u64 = 0xBB67AE8584CAA73B;
const SQRT5: u64 = 0x3C6EF372FE94F82B;
const SQRT19: u64 = 0x5BE0CD19137E2179;

#[wasm_bindgen]
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

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Remember that KSINK + Perlin = ❤️");
}
