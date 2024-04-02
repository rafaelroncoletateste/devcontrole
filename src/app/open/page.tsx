"use client";

import { useState } from "react";
import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FiSearch } from "react-icons/fi";

const schema = z.object({
  email: z
    .string()
    .email("Digite o e-mail do cliente")
    .min(1, "O e-mail é obrigatório"),
});

type FormData = z.infer<typeof schema>;

interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>({
    id: "1",
    name: "Rafael",
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="w-full max-w-2xl mx-auto px-2 ">
      <h1 className="font-bold text-3xl text-center mt-24">Abrir Chamado</h1>

      <main className="flex flex-col">
        {customer ? (
          <div></div>
        ) : (
          <form action="#" className="bg-slate-200 py-6 px-2 rounded border-2">
            <div className="flex flex-col gap-3">
              <Input
                name="email"
                placeholder="Digite o email do cliente"
                type="text"
                error={errors.email?.message}
                register={register}
              />

              <button
                type="submit"
                className="bg-blue-500 flex flex-row gap-4 px-2 h-11 items-center justify-center text-white font-bold rounded"
              >
                Procurar cliente
                <FiSearch size={24} color="#fff" />
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
