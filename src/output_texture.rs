use crate::{
    gradient::{Gradient, WasmGradient},
    random::{ksink, phash},
};
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
    gradient: Gradient,
}

// -------------------------------------------------------------------------------------------------
// KSINK
// -------------------------------------------------------------------------------------------------

#[wasm_bindgen]
pub struct KSINKOutputTextureDescriptor(OutputTextureDescriptor<u32, u64>);

#[wasm_bindgen]
impl KSINKOutputTextureDescriptor {
    #[wasm_bindgen(constructor)]
    pub fn new(
        resolution_y: u32,
        resolution_x: u32,
        seed: u64,
        gradient: &WasmGradient,
    ) -> KSINKOutputTextureDescriptor {
        KSINKOutputTextureDescriptor(OutputTextureDescriptor {
            resolution_y,
            resolution_x,
            seed,
            gradient: gradient.inner().clone(),
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
                            let k = (ksink((y as u64) << 32 | (x as u64), self.0.seed) % 255) as u8;
                            self.0.gradient.color_at(k).to_tuple()
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
pub enum Dimension {
    T,
    Z,
    Y,
    X,
}

#[wasm_bindgen]
pub struct PHashOutputTextureDescriptor {
    output_texture: OutputTextureDescriptor<u8, u8>,
    offset_0: Dimension,
    offset_8: Dimension,
    offset_16: Dimension,
    offset_24: Dimension,
}

#[wasm_bindgen]
impl PHashOutputTextureDescriptor {
    #[wasm_bindgen(constructor)]
    pub fn new(
        resolution_y: u8,
        resolution_x: u8,
        seed: u8,
        gradient: &WasmGradient,
        offset_0: Dimension,
        offset_8: Dimension,
        offset_16: Dimension,
        offset_24: Dimension,
    ) -> PHashOutputTextureDescriptor {
        PHashOutputTextureDescriptor {
            output_texture: OutputTextureDescriptor {
                resolution_y,
                resolution_x,
                seed,
                gradient: gradient.inner().clone(),
            },
            offset_0,
            offset_8,
            offset_16,
            offset_24,
        }
    }

    #[wasm_bindgen]
    #[allow(non_snake_case)]
    pub fn generateTexture(self) -> OutputTexture {
        OutputTexture(
            (0..self.output_texture.resolution_y)
                .map(|y| {
                    (0..self.output_texture.resolution_x)
                        .map(|x| {
                            let k = phash(
                                match &self.offset_0 {
                                    Dimension::T => self.output_texture.seed as u32,
                                    Dimension::Z => 0,
                                    Dimension::Y => y as u32,
                                    Dimension::X => x as u32,
                                } | (match &self.offset_8 {
                                    Dimension::T => self.output_texture.seed as u32,
                                    Dimension::Z => 0,
                                    Dimension::Y => y as u32,
                                    Dimension::X => x as u32,
                                } << 8)
                                    | (match &self.offset_16 {
                                        Dimension::T => self.output_texture.seed as u32,
                                        Dimension::Z => 0,
                                        Dimension::Y => y as u32,
                                        Dimension::X => x as u32,
                                    } << 16)
                                    | (match &self.offset_24 {
                                        Dimension::T => self.output_texture.seed as u32,
                                        Dimension::Z => 0,
                                        Dimension::Y => y as u32,
                                        Dimension::X => x as u32,
                                    } << 24),
                            ) as u8;

                            self.output_texture.gradient.color_at(k).to_tuple()
                        })
                        .collect()
                })
                .collect(),
        )
    }
}
