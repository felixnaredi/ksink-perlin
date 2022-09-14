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

pub fn phash(mut v: u32) -> u8 {
    let c = (SQRT3 >> 32) as u32;

    v *= c;
    v ^= v >> 16;
    v *= c;
    (v ^ v >> 16) as u8
}
