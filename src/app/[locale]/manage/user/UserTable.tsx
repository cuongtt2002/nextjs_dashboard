"use client";

import { useEffect, useState, createContext } from "react";
import { Button } from "@/components/ui/button";
import { IUser } from "@/interface/user";
import { userService } from "@/services/userService";
import UserForm from "./UserForm";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const TableContext = createContext({
  setIsRefreshList: (value: boolean) => {},
});

export default function UserTable() {
  const t = useTranslations();
  const [users, setUsers] = useState<IUser[]>([]);
  const [id, setId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isRefreshList, setIsRefreshList] = useState(false);
  const [mode, setMode] = useState<string>("");

  useEffect(() => {
    setUsers(userService.getAll());
  }, []);

  useEffect(() => {
    if (isRefreshList) {
      setUsers(userService.getAll());
      setIsRefreshList(false);
    }
  }, [isRefreshList]);

  const openAdd = () => {
    setId("");
    setIsOpen(true);
    setMode("create");
  };

  const openEdit = (id: string) => {
    if (!id) return;
    setId(id);
    setIsOpen(true);
    setMode("edit");
  };

  const deleteUser = (id: string) => {
    userService.remove(id);
    toast.success(t("deleted_success"));
    setIsRefreshList(true);
  };

  return (
    <TableContext.Provider value={{ setIsRefreshList }}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{t("manage_users")}</h1>

        <div className="w-full flex justify-end mb-4 ">
          <Button className="cursor-pointer" onClick={openAdd}>
            {t("button_add_new")}
          </Button>
        </div>

        <table className="min-w-full border rounded-md overflow-hidden">
          <thead>
            <tr>
              <th className="p-2 border">{t("manage_users_field_name")}</th>
              <th className="p-2 border">{t("manage_users_field_email")}</th>
              <th className="p-2 border">{t("manage_users_field_age")}</th>
              <th className="p-2 border">{t("table_actions")}</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.age}</td>
                  <td className="p-2 border space-x-2">
                    <Button
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => openEdit(user.id as string)}
                    >
                      {t("button_edit")}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => deleteUser(user?.id as string)}
                    >
                      {t("button_delete")}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  {t("no_users_found")}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <UserForm
          id={id}
          setId={setId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mode={mode}
        />
      </div>
    </TableContext.Provider>
  );
}
