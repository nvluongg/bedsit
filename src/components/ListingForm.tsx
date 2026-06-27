"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { ListingDraft } from "@/types/domain";

const listingSchema = z.object({
  title: z.string().min(6, "Tên phòng cần ít nhất 6 ký tự"),
  district: z.string().min(2, "Vui lòng nhập quận/khu vực"),
  price: z.coerce.number().min(1000000, "Giá cần từ 1.000.000đ"),
  area: z.coerce.number().min(8, "Diện tích cần từ 8m²"),
  utilities: z.string().min(5, "Vui lòng nhập ít nhất một tiện ích"),
  contact: z.string().min(8, "Vui lòng nhập số điện thoại hoặc email"),
  commitment: z.boolean().refine((value) => value, "Cần cam kết thông tin đúng sự thật")
});

type ListingFormProps = {
  onSubmitDraft: (draft: ListingDraft) => void;
};

type ListingFormInput = z.input<typeof listingSchema>;
type ListingFormOutput = z.output<typeof listingSchema>;

export function ListingForm({ onSubmitDraft }: ListingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<ListingFormInput, unknown, ListingFormOutput>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      district: "",
      price: 3500000,
      area: 20,
      utilities: "",
      contact: "",
      commitment: false
    }
  });

  const submit = (draft: ListingFormOutput) => {
    onSubmitDraft(draft);
    reset({
      title: "",
      district: "",
      price: 3500000,
      area: 20,
      utilities: "",
      contact: "",
      commitment: false
    });
  };

  return (
    <form className="listing-form" onSubmit={handleSubmit(submit)}>
      <label>
        Tên phòng
        <input {...register("title")} placeholder="Studio gần Đại học..." />
        {errors.title && <span className="field-error">{errors.title.message}</span>}
      </label>
      <div className="form-grid">
        <label>
          Quận/khu vực
          <input {...register("district")} placeholder="Cầu Giấy" />
          {errors.district && <span className="field-error">{errors.district.message}</span>}
        </label>
        <label>
          Giá thuê
          <input {...register("price")} inputMode="numeric" />
          {errors.price && <span className="field-error">{errors.price.message}</span>}
        </label>
      </div>
      <div className="form-grid">
        <label>
          Diện tích
          <input {...register("area")} inputMode="numeric" />
          {errors.area && <span className="field-error">{errors.area.message}</span>}
        </label>
        <label>
          Liên hệ
          <input {...register("contact")} placeholder="090..." />
          {errors.contact && <span className="field-error">{errors.contact.message}</span>}
        </label>
      </div>
      <label>
        Tiện ích
        <textarea {...register("utilities")} placeholder="wifi, gửi xe, nhà vệ sinh riêng..." />
        {errors.utilities && <span className="field-error">{errors.utilities.message}</span>}
      </label>
      <label className="checkbox-line">
        <input type="checkbox" {...register("commitment")} />
        Tôi cam kết thông tin tin đăng là đúng sự thật.
      </label>
      {errors.commitment && <span className="field-error">{errors.commitment.message}</span>}
      {isSubmitSuccessful && <p className="success-note">Tin nháp đã được tạo trong phiên hiện tại.</p>}
      <button className="icon-button primary" type="submit">
        <Save aria-hidden="true" size={18} />
        Lưu tin nháp
      </button>
    </form>
  );
}
