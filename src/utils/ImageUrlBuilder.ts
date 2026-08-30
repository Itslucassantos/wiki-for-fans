class ImageUrlBuilder {
  private static readonly baseUrl = "https://image.tmdb.org/t/p";

  static build(path: string | null, size: "w500" | "original" = "w500"): string | null {
    return path ? `${this.baseUrl}/${size}${path}` : null;
  }
}

export { ImageUrlBuilder };
