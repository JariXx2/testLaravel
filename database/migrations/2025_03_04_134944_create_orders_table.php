<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name')->nullable(false);
            $table->enum('status', ['new','completed'])->default('new');
            $table->text("customer_comment")->nullable(false);
            $table->unsignedBigInteger("goods_id")->nullable(false);
            $table->foreign("goods_id")->references("id")
                ->on("goods")->onDelete("cascade");
            $table->unsignedInteger("quantity")->default(1)->min(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
