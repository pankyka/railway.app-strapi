import { factories } from "@strapi/strapi";
import { User } from "../../../types/user.interface";

export default factories.createCoreController(
  "plugin::users-permissions.user",
  ({ strapi }) => ({
    async register(ctx) {
      // Meghívjuk az eredeti regisztrációs logikát
      const response = (await strapi
        .plugin("users-permissions")
        .controllers.auth.register(ctx, async () => {})) as { user: User };

      const user = response.user;

      // Létrehozunk egy új Tenant entitást
      const tenant = await strapi.entityService.create("api::tenant.tenant", {
        data: {
          name: user.username || user.email.split("@")[0],
        },
      });

      // Frissítjük a regisztrált felhasználót tenant kapcsolattal + szerepkörrel
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        user.id,
        {
          data: {
            tenant: tenant.id,
            tenantRole: "TenantAdmin",
          },
        } as any
      );

      // Újra lekérjük a user-t tenant-tal együtt
      const updatedUser = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        user.id,
        {
          populate: ["tenant"],
        }
      );

      return {
        ...response,
        user: updatedUser,
      };
    },
  })
);
