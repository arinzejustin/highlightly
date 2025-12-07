<script lang="ts">
    import type { User } from "$lib/types";

    // Props
    let {
        showAccount = false,
        user = null,
        loggedIn = false,
        onSignIn = () => {},
    } = $props<{
        showAccount?: boolean;
        user?: User | null;
        loggedIn?: boolean;
        onSignIn?: () => void;
    }>();

    const getNextResetDay = () => {
        if (!user?.createdAt) return "—";

        const created = new Date(user.createdAt);
        const now = new Date();

        const daysSinceCreation = Math.floor(
            (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24),
        );
        const currentCycle = Math.floor(daysSinceCreation / 21);
        const nextReset = new Date(created);
        nextReset.setDate(created.getDate() + (currentCycle + 1) * 21);

        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        return `${months[nextReset.getMonth()]} ${nextReset.getDate()}, ${nextReset.getFullYear()}`;
    };
</script>

<div class="mx-auto w-[96%]">
    {#if showAccount}
        {#if !user && !loggedIn}
            <p class="text-base text-muted-foreground">Information</p>
            <div class="p-6 py-2 m-3 my-4 bg-card rounded-lg shadow-md border">
                <div
                    class="flex items-center justify-between align-middle border-b p-2"
                >
                    <p class="text-base font-medium">Name</p>
                    <p class="text-muted-foreground">John Doe</p>
                </div>
                <div class="flex items-center justify-between align-middle p-2">
                    <p class="text-base font-medium">Email</p>
                    <p class="text-muted-foreground">code@example.com</p>
                </div>
            </div>
            <p class="text-base text-muted-foreground">Plan</p>
            <div class="p-6 py-2 m-3 my-4 bg-card rounded-lg shadow-md border">
                <div
                    class="flex items-center justify-between align-middle border-b p-2"
                >
                    {#if user.plan === "free"}
                        <p class="text-base font-medium">50 Requests/Month</p>
                        <a
                            href="https://highlight.pro/upgrade"
                            target="_blank"
                            class="text-primary underline">Upgrade</a
                        >
                    {:else}
                        <p class="text-base font-medium">Unlimited Requests</p>
                        <p class="text-muted-foreground">{user.plan}</p>
                    {/if}
                </div>
                <div class="flex items-center justify-between align-middle p-2">
                    <p class="text-base font-medium">
                        {user.plan === "free" ? "Reset Date" : "Expiry Date"}
                    </p>
                    <p class="text-muted-foreground">
                        {user.plan === "free"
                            ? getNextResetDay()
                            : user.expiryDate}
                    </p>
                </div>
            </div>
            <p class="text-base text-muted-foreground">Devices</p>
            <div class="p-6 py-2 m-3 my-4 bg-card rounded-lg shadow-md border">
                <div
                    class="flex items-center justify-between align-middle border-b p-2"
                >
                    <p class="text-base font-medium">Name</p>
                    <p class="text-muted-foreground">John Doe</p>
                </div>
                <div class="flex items-center justify-between align-middle p-2">
                    <p class="text-base font-medium">Email</p>
                    <p class="text-muted-foreground">code@example.com</p>
                </div>
            </div>
        {:else}
            <div class="h-48 flex flex-col justify-center items-center px-6">
                <div class="text-center space-y-6">
                    <p class="text-lg font-medium">
                        Sign in to access your account
                    </p>
                    <button
                        onclick={onSignIn}
                        class="w-full max-w-xs px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        {/if}
    {/if}
</div>
