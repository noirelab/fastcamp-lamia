"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { metricSchema, type MetricInput } from "@/modules/dashboard/schemas";
import type { SeasonMetric } from "@/modules/dashboard/data/mock";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { TextField } from "@/shared/components/TextField";

interface MetricFormProps {
  onAddMetric: (metric: SeasonMetric) => void;
}

export const MetricForm = ({ onAddMetric }: MetricFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MetricInput>({
    resolver: zodResolver(metricSchema),
  });

  const onSubmit = (data: MetricInput) => {
    onAddMetric({
      label: data.label,
      value: Number(data.value.replace(",", ".")),
      caption: data.caption,
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 grid gap-4 sm:grid-cols-[1.2fr_0.6fr_1.2fr_auto] sm:items-start"
      noValidate
    >
      <TextField
        id="metric-label"
        label="Rótulo"
        placeholder="Ex.: Pole positions"
        error={errors.label?.message}
        {...register("label")}
      />
      <TextField
        id="metric-value"
        label="Valor"
        inputMode="decimal"
        placeholder="Ex.: 10"
        error={errors.value?.message}
        {...register("value")}
      />
      <TextField
        id="metric-caption"
        label="Legenda"
        placeholder="Ex.: Max Verstappen"
        error={errors.caption?.message}
        {...register("caption")}
      />
      <PrimaryButton type="submit" className="sm:mt-6">
        Adicionar métrica
      </PrimaryButton>
    </form>
  );
};
