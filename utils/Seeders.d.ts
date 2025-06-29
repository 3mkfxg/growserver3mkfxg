/**
 * Unified seeded random number generator providing deterministic pseudo-random values
 *
 * This class creates a deterministic random number generator based on a seed string or number.
 * All methods will produce the same sequence of values when given the same seed, making it
 * perfect for procedural generation, testing, and reproducible randomness.
 *
 * @example Basic Usage
 * ```typescript
 * const rng = new Seeders("world123");
 * console.log(rng.hash());           // Always: 3847291023
 * console.log(rng.int(10));          // Random int 0-9: 4
 * console.log(rng.float(1.0));       // Random float 0-1: 0.7834
 * console.log(rng.alphanumeric(8));  // Random string: "aB3cD1eF"
 * ```
 *
 * @example With Salt for Different Sequences
 * ```typescript
 * const levelGen = new Seeders("world123", "level1");
 * const itemGen = new Seeders("world123", "items");
 * // Same base seed, different sequences due to salt
 * ```
 *
 * @example Procedural Generation
 * ```typescript
 * const rng = new Seeders("dungeon_42");
 * const roomCount = rng.int(15, 5);           // 5-14 rooms
 * const treasureChance = rng.float(1.0);      // 0.0-1.0 probability
 * const monsterType = rng.choice(['goblin', 'orc', 'skeleton']);
 * ```
 */
export declare class Seeders {
    private seed;
    private state;
    private originalSeed;
    private originalSalt;
    private randoms;
    /**
     * Creates a new seeded random number generator
     *
     * @param seed - Base seed value (string or number) that determines the random sequence
     * @param salt - Optional salt to create different sequences from same base seed
     *
     * @example
     * ```typescript
     * const rng1 = new Seeders("myGame");
     * const rng2 = new Seeders("myGame", "level2"); // Different sequence
     * const rng3 = new Seeders(12345);             // Number seed
     * ```
     */
    constructor(seed: string | number, salt?: string | number);
    /**
     * Create individual seeded random number generators for different purposes
     * Ensures each method has its own deterministic sequence
     */
    private createRandomGenerators;
    /**
     * Converts string to numeric seed with good distribution
     */
    private stringToSeed;
    /**
     * Creates a seeded random generator using Xorshift algorithm
     */
    private seededRandom;
    /**
     * Generates a deterministic hash value from the seed, optionally bounded
     *
     * This method always returns the same value for the same seed, making it perfect
     * for generating consistent IDs, colors, or other properties based on a seed.
     *
     * @param max - Maximum value (exclusive). If provided alone, range is 0 to max
     * @param min - Minimum value (inclusive). Defaults to 0 if max is provided
     * @returns Deterministic hash value derived from seed
     *
     * @example
     * ```typescript
     * const rng = new Seeders("player123");
     *
     * // Raw hash value
     * console.log(rng.hash());        // 3847291023
     *
     * // Bounded hash (0-99)
     * console.log(rng.hash(100));     // 23
     *
     * // Custom range (10-50)
     * console.log(rng.hash(50, 10));  // 34
     *
     * // Color generation
     * const red = rng.hash(256);
     * const green = rng.hash(256);
     * const blue = rng.hash(256);
     * ```
     */
    hash(max?: number, min?: number): number;
    /**
     * Generates next pseudo-random number in the sequence (0 to 1)
     *
     * This advances the internal state and returns the next value in the sequence.
     * Each call produces a different value, but the sequence is deterministic.
     *
     * @returns Number between 0 (inclusive) and 1 (exclusive)
     *
     * @example
     * ```typescript
     * const rng = new Seeders("test");
     * console.log(rng.next()); // 0.2341
     * console.log(rng.next()); // 0.8923
     * console.log(rng.next()); // 0.4567
     * ```
     */
    next(): number;
    /**
     * Generates random integer in specified range
     *
     * @param max - Maximum value (exclusive). If only max is provided, range is 0 to max
     * @param min - Minimum value (inclusive). Defaults to 0
     * @returns Random integer between min (inclusive) and max (exclusive)
     *
     * @example
     * ```typescript
     * const rng = new Seeders("dice");
     *
     * // Dice roll (1-6)
     * console.log(rng.int(7, 1));     // 4
     *
     * // Array index (0-9)
     * console.log(rng.int(10));       // 7
     *
     * // Damage range (50-100)
     * console.log(rng.int(101, 50));  // 73
     * ```
     */
    int(max: number, min?: number): number;
    /**
     * Generates random floating-point number in specified range
     *
     * @param max - Maximum value (exclusive). If only max is provided, range is 0 to max
     * @param min - Minimum value (inclusive). Defaults to 0
     * @param dont_random - If true, always returns constant value
     * @returns Random float between min (inclusive) and max (exclusive)
     *
     * @example
     * ```typescript
     * const rng = new Seeders("physics");
     *
     * // Probability (0-1)
     * console.log(rng.float(1.0));        // 0.7834
     *
     * // Temperature (-10 to 40)
     * console.log(rng.float(40, -10));    // 23.4
     *
     * // Speed multiplier
     * console.log(rng.float(2.0, 0.5));   // 1.23
     * ```
     */
    float(max: number, min?: number, dont_random?: boolean): number;
    /**
     * Generates deterministic alphanumeric string
     *
     * Perfect for generating consistent IDs, passwords, or random strings that need
     * to be the same across multiple runs with the same seed.
     *
     * @param length - Desired string length
     * @param charset - Custom character set (defaults to alphanumeric)
     * @returns Deterministic string of specified length
     *
     * @example
     * ```typescript
     * const rng = new Seeders("user123");
     *
     * // Session ID
     * console.log(rng.alphanumeric(16));              // "aB3cD1eFgH2iJ4kL"
     *
     * // Numeric code
     * console.log(rng.alphanumeric(6, "0123456789")); // "384729"
     *
     * // Hex color
     * console.log(rng.alphanumeric(6, "0123456789ABCDEF")); // "3A4F2C"
     *
     * // Password
     * console.log(rng.alphanumeric(12, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%"));
     * ```
     */
    alphanumeric(length: number, charset?: string): string;
    /**
     * Generates deterministic 1D Perlin-like noise
     *
     * Creates smooth, natural-looking random values perfect for procedural generation
     * of terrain, textures, or any data that needs organic randomness.
     *
     * @param x - Input coordinate (position along the noise function)
     * @param amplitude - Amplitude multiplier (default: 1)
     * @param max - Maximum output value (default: 1)
     * @param min - Minimum output value (default: -1)
     * @param frequency - Noise frequency - higher = more detailed (default: 0.01)
     * @param octaves - Number of noise layers for detail (default: 1)
     * @returns Deterministic noise value within specified range
     *
     * @example
     * ```typescript
     * const rng = new Seeders("terrain");
     *
     * // Simple height map (0-255)
     * for (let x = 0; x < 100; x++) {
     *   const height = rng.noise(x, 1, 255, 0, 0.05);
     *   console.log(`Height at ${x}: ${height}`);
     * }
     *
     * // Animated value over time
     * const time = Date.now() * 0.001;
     * const wobble = rng.noise(time, 1, 1, -1, 0.5); // -1 to 1
     *
     * // Multi-octave terrain
     * const detailedHeight = rng.noise(x, 1, 100, 0, 0.01, 4);
     * ```
     */
    noise(x: number, amplitude?: number, max?: number, min?: number, frequency?: number, octaves?: number): number;
    /**
     * Shuffles array deterministically using Fisher-Yates algorithm
     *
     * Modifies the original array in place and returns it. The shuffle will always
     * be the same for the same seed, making it perfect for consistent randomization.
     *
     * @param array - Array to shuffle (modified in place)
     * @returns Shuffled array (same reference as input)
     *
     * @example
     * ```typescript
     * const rng = new Seeders("deck");
     *
     * // Shuffle playing cards
     * const cards = ['A', 'K', 'Q', 'J', '10', '9'];
     * rng.shuffle(cards);
     * console.log(cards); // ['Q', 'A', 'J', '10', 'K', '9']
     *
     * // Shuffle quest rewards
     * const rewards = ['sword', 'shield', 'potion', 'gold'];
     * rng.shuffle(rewards);
     *
     * // Create shuffled copy (don't modify original)
     * const originalOrder = ['a', 'b', 'c', 'd'];
     * const shuffled = rng.shuffle([...originalOrder]);
     * ```
     */
    shuffle<T>(array: T[]): T[];
    /**
     * Picks random element from array deterministically
     *
     * @param array - Array to pick from (must not be empty)
     * @returns Random element from array
     *
     * @example
     * ```typescript
     * const rng = new Seeders("loot");
     *
     * // Random loot drop
     * const loot = ['sword', 'shield', 'potion', 'gold'];
     * console.log(rng.choice(loot)); // 'shield'
     *
     * // Random enemy type
     * const enemies = ['goblin', 'orc', 'skeleton'];
     * const enemy = rng.choice(enemies);
     *
     * // Random weather
     * const weather = ['sunny', 'cloudy', 'rainy', 'stormy'];
     * const today = rng.choice(weather);
     *
     * // Weighted choice (manual)
     * const weightedItems = ['common', 'common', 'common', 'rare', 'epic'];
     * const item = rng.choice(weightedItems);
     * ```
     */
    choice<T>(array: T[]): T;
    /**
     * Resets generator to initial state with new seed
     *
     * @param seed - New seed value
     * @param salt - Optional salt for different sequences
     *
     * @example
     * ```typescript
     * const rng = new Seeders("level1");
     * console.log(rng.int(10)); // 4
     *
     * // Reset with new seed
     * rng.reset("level2");
     * console.log(rng.int(10)); // 7 (different sequence)
     *
     * // Reset to same seed
     * rng.reset("level1");
     * console.log(rng.int(10)); // 4 (back to original)
     * ```
     */
    reset(seed: string | number, salt?: string | number): void;
}
/**
 * Convenience function for quick seeded random generator creation
 *
 * @param seed - Seed value (string or number)
 * @param salt - Optional salt for different sequences
 * @returns New Seeders instance
 *
 * @example
 * ```typescript
 * // Quick creation
 * const rng = createSeeders("myGame", "level3");
 *
 * // Equivalent to:
 * const rng2 = new Seeders("myGame", "level3");
 * ```
 */
export declare function createSeeders(seed: string | number, salt?: string | number): Seeders;
