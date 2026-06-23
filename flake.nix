{
  description = "misaka10987's blog";

  inputs = {
    system.url = "path:/etc/nixos";
    nixpkgs.follows = "system/nixpkgs";
  };

  outputs =
    { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
        config.allowUnfree = true;
      };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = [
          pkgs.gcc.cc.lib
        ];
        shellHook = ''
          export LD_LIBRARY_PATH=${pkgs.gcc.cc.lib}/lib:$LD_LIBRARY_PATH
        '';
      };
    };
}
