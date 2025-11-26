"use client";

import { useContext, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { userService } from "@/services/userService";
import { TableContext } from "./UserTable";
import { useTranslations } from "next-intl";
import { IUser } from "@/interface/user";

type Props = {
  id: string;
  isOpen: boolean;
  setId: (id: string) => void;
  onClose: () => void;
  mode: string;
};

const schema = z.object({
  name: z.string().min(1, { message: "required" }),
  email: z.string().min(1, { message: "required" }).email({
    message: "invalidEmail",
  }),
  age: z.number().min(0, { message: "age_min" }),
});

export default function UserForm({ id, isOpen, setId, onClose, mode }: Props) {
  const { setIsRefreshList } = useContext(TableContext);
  const t = useTranslations();

  const form = useForm<IUser>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      age: 0,
    },
  });

  useEffect(() => {
    if (!id) {
      form.reset({
        name: "",
        email: "",
        age: 0,
      });
      return;
    }

    const user = userService.getById(id);
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        age: user.age,
      });
    }
  }, [id]);

  const reset = () => {
    form.reset();
    setId("");
    onClose();
  };

  const handleSubmit = (data: IUser) => {
    if (id) {
      // Update
      userService.update({ id, ...data });
      toast.success(t("updated_success"));
    } else {
      // Create
      userService.add({ id: uuidv4(), ...data });
      toast.success(t("created_success"));
    }

    setIsRefreshList(true);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && reset()}>
      <DialogContent
        className="sm:max-w-[500px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {mode === "edit"
              ? t("user_form_title_update")
              : t("user_form_title_add_new")}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 py-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field, formState: { errors } }) => (
                <FormItem>
                  <Label>
                    {t("manage_users_field_name")}{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input placeholder="Full name" {...field} />
                  <FormMessage>
                    {Boolean(errors.name?.message) &&
                      t(errors.name?.message as any)}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, formState: { errors } }) => (
                <FormItem>
                  <Label>
                    {t("manage_users_field_email")}{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input placeholder="Email" type="email" {...field} />
                  <FormMessage>
                    {Boolean(errors.email?.message) &&
                      t(errors.email?.message as any)}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field, formState: { errors } }) => (
                <FormItem>
                  <Label>
                    {t("manage_users_field_age")}{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="Age"
                    type="number"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <FormMessage>
                    {Boolean(errors.age?.message) &&
                      t(errors.age?.message as any)}
                  </FormMessage>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="w-full cursor-pointer ">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
