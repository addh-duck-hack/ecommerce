import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EcommerceGuestService } from '../_services/ecommerce-guest.service';
import { CartService } from '../_services/cart.service';

declare var $: any;
declare function LandingProductDetail(): any;
declare function ModalProductDetail(): any;

@Component({
  selector: 'app-landing-product',
  templateUrl: './landing-product.component.html',
  styleUrls: ['./landing-product.component.css']
})
export class LandingProductComponent implements OnInit {
  
  slug:any = null;
  product_selected:any = null;
  product_selected_modal: any = null;
  related_products: any = [];
  variedad_seleted: any = null;
  constructor(
    public ecommerce_guest: EcommerceGuestService,
    public route: Router,
    public routerActived: ActivatedRoute,
    public cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.routerActived.params.subscribe((resp: any) => {
      this.slug = resp['slug'];
    })
    console.log(this.slug);
    this.ecommerce_guest.showLandingProduct(this.slug).subscribe((resp: any) => {
      console.log(resp);
      this.product_selected = resp.product;
      this.related_products = resp.related_products;
      setTimeout(() => {
        LandingProductDetail();
      }, 50);
    });
  }
  OpenModal(bestProduct: any, FlashSale: any = null) {
    this.product_selected_modal = null;
    setTimeout(() => {
      this.product_selected_modal = bestProduct;
      this.product_selected_modal.FlashSale = FlashSale;
      setTimeout(() => {
        ModalProductDetail();
      }, 50);
    }, 100);
  }

  getCalNewPrice(product: any) {
    // if (this.FlashSale.type_discount == 1) {
    //   return product.price_soles - product.price_soles*this.FlashSale.discount*0.01;
    // }else{
    //   return product.price_soles - this.FlashSale.discount;
    // }
    return 0;
  }
  selectedVariedad(variedad: any) { 
    this.variedad_seleted = variedad;
  }
  addCart(product: any) {
    console.log(product);
    if(!this.cartService._authService.user){
      alert('NECESITAS AUTENTICARTE PARA PODER AGREGAR EL PRODUCTO AL CARRITO');
      return;
    }
    if($("#qty-cart").val() == 0){
      alert("NECESITAS AGREGAR UNA CANTIDAD MAYOR A 0 DEL PRODUCTO PARA EL CARRITO");
      return;
    }
    if(this.product_selected.type_inventario == 2){
      if(!this.variedad_seleted){
        alert("NECESITAS SELECIONAR UNA VARIEDAD PARA EL PRODUCTO");
        return;
      }
      if(this.variedad_seleted){
        if(this.variedad_seleted.stock < $("#qty-cart").val()){
          alert("NECESITAS AGRECAR UNA CANTIDAD MENOR POR QUE NO SE TIENE ESL STOCK SUFICIENTE");
          return;
        }
      }
    }
    let data = {
      user: this.cartService._authService.user._id,
      product: this.product_selected._id,
      type_discount: null,
      discout: 0,
      cantidad: $("#qty-cart").val(),
      variedad: this.variedad_seleted ? this.variedad_seleted._id : null,
      code_cupon: null,
      code_discount: null,
      price_unitario: this.product_selected.price_soles,
      subtotal: this.product_selected.price_soles * $("#qty-cart").val(),
      total: this.product_selected.price_soles * $("#qty-cart").val(),
    }
    this.cartService.registerCart(data).subscribe((resp:any) => {
      if(resp.message == 403){
        alert(resp.mesage_text);
        return;
      }else{
        this.cartService.changeCart(resp.cart);
      }
    },error => {
      console.log(error);
      if(error.error.message == "EL TOKEN NO ES VALIDO"){
        this.cartService._authService.logout();
      }
    })
  }
}
