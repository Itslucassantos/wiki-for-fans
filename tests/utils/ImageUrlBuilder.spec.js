"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImageUrlBuilder_1 = require("../../src/utils/ImageUrlBuilder");
describe("ImageUrlBuilder", () => {
  it("builds a full TMDB image URL with default size", () => {
    const path = "/abc123.jpg";
    const result = ImageUrlBuilder_1.ImageUrlBuilder.build(path);
    expect(result).toBe("https://image.tmdb.org/t/p/w500/abc123.jpg");
  });
  it("builds a full TMDB image URL with original size", () => {
    const path = "/poster.png";
    const result = ImageUrlBuilder_1.ImageUrlBuilder.build(path, "original");
    expect(result).toBe("https://image.tmdb.org/t/p/original/poster.png");
  });
  it("returns null when path is null", () => {
    const result = ImageUrlBuilder_1.ImageUrlBuilder.build(null);
    expect(result).toBeNull();
  });
  it("returns null even when size is provided but path is null", () => {
    const result = ImageUrlBuilder_1.ImageUrlBuilder.build(null, "original");
    expect(result).toBeNull();
  });
});
//# sourceMappingURL=ImageUrlBuilder.spec.js.map
