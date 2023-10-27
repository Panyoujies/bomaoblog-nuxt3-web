import {Carousel, CarouselParam} from "./model";
import request from "~/composables/request";

/**
 * 查询品类列表
 */
export async function listCarousels(params?: CarouselParam) {
  const res = await request.get<Carousel[]>('/content/carousel', params, {
    server: false
  })
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}