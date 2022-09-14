use crate::random::{ksink, phash};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct OutputTexture(Vec<Vec<(u8, u8, u8, u8)>>);

impl OutputTexture {
    pub fn height(&self) -> usize {
        self.0.len()
    }

    pub fn width(&self) -> usize {
        self.0.first().map_or(0, Vec::len)
    }

    pub fn into_rows(self) -> impl Iterator<Item = Vec<(u8, u8, u8, u8)>> {
        self.0.into_iter()
    }
}

pub struct OutputTextureDescriptor<R, S> {
    resolution_y: R,
    resolution_x: R,
    seed: S,
}

// -------------------------------------------------------------------------------------------------
// KSINK
// -------------------------------------------------------------------------------------------------

#[wasm_bindgen]
pub struct KSINKOutputTextureDescriptor(OutputTextureDescriptor<u32, u64>);

#[wasm_bindgen]
impl KSINKOutputTextureDescriptor {
    #[wasm_bindgen(constructor)]
    pub fn new(resolution_y: u32, resolution_x: u32, seed: u64) -> KSINKOutputTextureDescriptor {
        KSINKOutputTextureDescriptor(OutputTextureDescriptor {
            resolution_y,
            resolution_x,
            seed,
        })
    }

    #[wasm_bindgen]
    #[allow(non_snake_case)]
    pub fn generateTexture(self) -> OutputTexture {
        OutputTexture(
            (0..self.0.resolution_y)
                .map(|y| {
                    (0..self.0.resolution_x)
                        .map(|x| {
                            let k = (ksink((y as u64) << 32 | (x as u64), self.0.seed) % 16) as u8;
                            (0u8, k * 17, (15 - k) * 17, 255u8)
                        })
                        .collect()
                })
                .collect(),
        )
    }
}

// -------------------------------------------------------------------------------------------------
// PHash
// -------------------------------------------------------------------------------------------------

#[wasm_bindgen]
pub struct PHashOutputTextureDescriptor(OutputTextureDescriptor<u8, u8>);

#[wasm_bindgen]
impl PHashOutputTextureDescriptor {
    #[wasm_bindgen(constructor)]
    pub fn new(resolution_y: u8, resolution_x: u8, seed: u8) -> PHashOutputTextureDescriptor {
        PHashOutputTextureDescriptor(OutputTextureDescriptor {
            resolution_y,
            resolution_x,
            seed,
        })
    }

    #[wasm_bindgen]
    #[allow(non_snake_case)]
    pub fn generateTexture(self) -> OutputTexture {
        OutputTexture(
            (0..self.0.resolution_y)
                .map(|y| {
                    (0..self.0.resolution_x)
                        .map(|x| {
                            let k =
                                phash((y as u32) << 24 | (x as u32) << 16 | (self.0.seed as u32))
                                    as u8;
                            (0u8, k * 17, (15 - k) * 17, 255u8)
                        })
                        .collect()
                })
                .collect(),
        )
    }
}
