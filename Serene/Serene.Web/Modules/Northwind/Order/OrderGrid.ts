﻿namespace Serene.Northwind {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.filterable()
    export class OrderGrid extends Serenity.EntityGrid<OrderRow, any> {
        protected getColumnsKey() { return "Northwind.Order"; }
        protected getDialogType() { return <any>OrderDialog; }
        protected getIdProperty() { return OrderRow.idProperty; }
        protected getLocalTextPrefix() { return OrderRow.localTextPrefix; }
        protected getService() { return OrderService.baseUrl; }

        protected shippingStateFilter: Serenity.EnumEditor;
        public customerFilter: CustomerEditor;

        constructor(container: JQuery) {
            super(container);
        }

        protected createQuickFilters() {
            super.createQuickFilters();

            let fld = OrderRow.Fields;
            this.customerFilter = this.findQuickFilter(CustomerEditor, fld.CustomerID);
            this.shippingStateFilter = this.findQuickFilter(Serenity.EnumEditor, fld.ShippingState);
        }

        protected getButtons()
        {
            var buttons = super.getButtons();

            buttons.push(Common.ExcelExportHelper.createToolButton({
                grid: this,
                service: OrderService.baseUrl + '/ListExcel',
                onViewSubmit: () => this.onViewSubmit()
            }));

            buttons.push(Common.PdfExportHelper.createToolButton({
                grid: this,
                onViewSubmit: () => this.onViewSubmit()
            }));

            return buttons;
        }

        public set_shippingState(value: number): void {
            this.shippingStateFilter.set_value(value == null ? '' : value.toString());
        }
    }
}